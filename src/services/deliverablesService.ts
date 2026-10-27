import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, MASTER_ADMIN_EMAIL, isMasterAdminEmail, cleanForFirestore } from '../lib/firebase';

export interface DeliverableItem {
  id: string;
  title: string;
  clientEmail: string;
  clientName?: string;
  clientPhone?: string;
  link: string;
  previewVideoUrl?: string;
  status: 'shooting' | 'editing' | 'review' | 'delivered';
  serviceType: 'podcast' | 'reels' | 'commercial' | 'other';
  recordingDate?: string;
  expiresAt?: string;
  notes?: string;
  viewCount?: number;
  downloadCount?: number;
  lastViewedAt?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RevisionItem {
  id: string;
  deliverableId: string;
  authorEmail: string;
  authorUid: string;
  comment: string;
  timecode?: string;
  category?: 'cut' | 'audio' | 'color' | 'caption' | 'general';
  status?: 'pending' | 'in_progress' | 'resolved';
  adminReply?: string;
  createdAt: string;
}

export interface ClientProfile {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'client';
  phone?: string;
  notes?: string;
  createdAt: string;
}

/**
 * Check whether a user is an admin:
 * 1. Matches master admin email (minakhairat96@gmail.com)
 * 2. Has an admin record in /admins/{uid}
 * 3. Has role: 'admin' in /users/{uid}
 */
export async function checkIsAdmin(uid: string, email: string | null): Promise<boolean> {
  if (isMasterAdminEmail(email)) {
    return true;
  }
  try {
    const adminDoc = await getDoc(doc(db, 'admins', uid));
    if (adminDoc.exists()) return true;

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists() && userDoc.data()?.role === 'admin') return true;

    return false;
  } catch {
    return false;
  }
}

/**
 * Ensure user document exists in /users/{uid}
 */
export async function syncUserProfile(
  uid: string,
  email: string,
  displayName?: string,
  forceRole?: 'admin' | 'client'
): Promise<'admin' | 'client'> {
  const isMaster = isMasterAdminEmail(email);
  const role: 'admin' | 'client' = forceRole || (isMaster ? 'admin' : 'client');
  const userRef = doc(db, 'users', uid);

  try {
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, cleanForFirestore({
        id: uid,
        email: email.toLowerCase(),
        displayName: displayName || email.split('@')[0],
        role,
        createdAt: new Date().toISOString(),
      }));
      if (isMaster) {
        try {
          await setDoc(doc(db, 'admins', uid), {
            email: email.toLowerCase(),
            createdAt: new Date().toISOString(),
          });
        } catch {
          // ignore
        }
      }
      return role;
    } else {
      const existing = snap.data();
      if (isMaster) {
        if (existing?.role !== 'admin') {
          try {
            await updateDoc(userRef, { role: 'admin' });
          } catch {
            // ignore
          }
        }
        try {
          const adminRef = doc(db, 'admins', uid);
          const adminSnap = await getDoc(adminRef);
          if (!adminSnap.exists()) {
            await setDoc(adminRef, {
              email: email.toLowerCase(),
              createdAt: new Date().toISOString(),
            });
          }
        } catch {
          // ignore
        }
        return 'admin';
      }
      return (existing?.role as 'admin' | 'client') || role;
    }
  } catch (error) {
    console.warn('syncUserProfile notice:', error);
    return isMaster ? 'admin' : role;
  }
}

// Local cache for deliverables
const LOCAL_DELIVERABLES_KEY = 'kin_studio_deliverables_cache';

function getLocalDeliverables(): DeliverableItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_DELIVERABLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalDeliverable(item: DeliverableItem) {
  try {
    const current = getLocalDeliverables().filter((d) => d.id !== item.id);
    current.unshift(item);
    localStorage.setItem(LOCAL_DELIVERABLES_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
}

function updateLocalDeliverable(id: string, updates: Partial<DeliverableItem>) {
  try {
    const current = getLocalDeliverables();
    const idx = current.findIndex((d) => d.id === id);
    if (idx >= 0) {
      current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(LOCAL_DELIVERABLES_KEY, JSON.stringify(current));
    }
  } catch {
    // ignore
  }
}

function removeLocalDeliverable(id: string) {
  try {
    const current = getLocalDeliverables().filter((d) => d.id !== id);
    localStorage.setItem(LOCAL_DELIVERABLES_KEY, JSON.stringify(current));
  } catch {
    // ignore
  }
}

/**
 * Admin: Listen to all deliverables
 */
export function subscribeAllDeliverables(
  onUpdate: (items: DeliverableItem[]) => void,
  onError?: (err: any) => void
): Unsubscribe {
  const path = 'deliverables';

  // Immediately provide local items so UI renders with zero lag
  const local = getLocalDeliverables();
  if (local.length > 0) {
    onUpdate(local);
  }

  const q = query(collection(db, path), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snap) => {
      const items: DeliverableItem[] = snap.docs.map((d) => d.data() as DeliverableItem);
      if (items.length > 0) {
        localStorage.setItem(LOCAL_DELIVERABLES_KEY, JSON.stringify(items));
        onUpdate(items);
      } else {
        const cached = getLocalDeliverables();
        onUpdate(cached);
      }
    },
    (err) => {
      console.warn('subscribeAllDeliverables notice (using local storage fallback):', err);
      if (onError) onError(err);
      const cached = getLocalDeliverables();
      if (cached.length > 0) onUpdate(cached);
    }
  );
}

/**
 * Client: Listen to deliverables assigned specifically to their email
 */
export function subscribeClientDeliverables(
  email: string,
  onUpdate: (items: DeliverableItem[]) => void,
  onError?: (err: any) => void
): Unsubscribe {
  const path = 'deliverables';
  const cleanEmail = email.trim().toLowerCase();

  // Provide local client deliverables first
  const local = getLocalDeliverables().filter((d) => d.clientEmail.toLowerCase() === cleanEmail);
  if (local.length > 0) {
    onUpdate(local);
  }

  const q = query(collection(db, path), where('clientEmail', '==', cleanEmail));

  return onSnapshot(
    q,
    (snap) => {
      const items: DeliverableItem[] = snap.docs.map((d) => d.data() as DeliverableItem);
      items.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
      onUpdate(items);
    },
    (err) => {
      console.warn('subscribeClientDeliverables notice (using local storage fallback):', err);
      if (onError) onError(err);
      const cached = getLocalDeliverables().filter((d) => d.clientEmail.toLowerCase() === cleanEmail);
      if (cached.length > 0) onUpdate(cached);
    }
  );
}

/**
 * Admin: Create a new deliverable link for a client email
 */
export async function createDeliverable(
  data: Omit<DeliverableItem, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'downloadCount' | 'lastViewedAt'>
): Promise<string> {
  const path = 'deliverables';
  const newId = 'deliv-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  // Recursively sanitize undefined fields so Firestore never rejects the write
  const deliverable: DeliverableItem = cleanForFirestore({
    ...data,
    id: newId,
    clientEmail: data.clientEmail.trim().toLowerCase(),
    viewCount: 0,
    downloadCount: 0,
    createdAt: now,
    updatedAt: now,
  });

  // Always save locally immediately
  saveLocalDeliverable(deliverable);

  try {
    await setDoc(doc(db, path, newId), deliverable);
    return newId;
  } catch (err) {
    console.warn('createDeliverable saved to local storage due to firestore error:', err);
    handleFirestoreError(err, OperationType.CREATE, `${path}/${newId}`);
  }
}

/**
 * Admin: Update deliverable details
 */
export async function updateDeliverable(
  id: string,
  data: Partial<DeliverableItem>
): Promise<void> {
  const path = `deliverables/${id}`;
  const payload: any = cleanForFirestore({
    ...data,
    updatedAt: new Date().toISOString(),
    ...(data.clientEmail ? { clientEmail: data.clientEmail.trim().toLowerCase() } : {}),
  });

  // Update local
  updateLocalDeliverable(id, payload);

  try {
    await updateDoc(doc(db, 'deliverables', id), payload);
  } catch (err) {
    console.warn('updateDeliverable saved to local storage due to firestore error:', err);
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/**
 * Client: Record view access
 */
export async function recordDeliverableView(item: DeliverableItem): Promise<void> {
  const path = `deliverables/${item.id}`;
  updateLocalDeliverable(item.id, {
    viewCount: (item.viewCount || 0) + 1,
    lastViewedAt: new Date().toISOString(),
  });

  try {
    await updateDoc(doc(db, 'deliverables', item.id), {
      viewCount: (item.viewCount || 0) + 1,
      lastViewedAt: new Date().toISOString(),
    });
  } catch {
    // safe fallback
  }
}

/**
 * Client: Record download click
 */
export async function recordDeliverableDownload(item: DeliverableItem): Promise<void> {
  const path = `deliverables/${item.id}`;
  updateLocalDeliverable(item.id, {
    downloadCount: (item.downloadCount || 0) + 1,
    lastViewedAt: new Date().toISOString(),
  });

  try {
    await updateDoc(doc(db, 'deliverables', item.id), {
      downloadCount: (item.downloadCount || 0) + 1,
      lastViewedAt: new Date().toISOString(),
    });
  } catch {
    // safe fallback
  }
}

/**
 * Admin: Delete a deliverable
 */
export async function deleteDeliverable(id: string): Promise<void> {
  removeLocalDeliverable(id);
  const path = `deliverables/${id}`;
  try {
    await deleteDoc(doc(db, 'deliverables', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

/**
 * Listen to revision feedback comments for a deliverable
 */
export function subscribeRevisions(
  deliverableId: string,
  onUpdate: (revs: RevisionItem[]) => void
): Unsubscribe {
  const path = `deliverables/${deliverableId}/revisions`;
  const q = query(collection(db, 'deliverables', deliverableId, 'revisions'));

  return onSnapshot(
    q,
    (snap) => {
      const items: RevisionItem[] = snap.docs.map((d) => d.data() as RevisionItem);
      items.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
      onUpdate(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.LIST, path);
    }
  );
}

/**
 * Add a revision / feedback note from client or admin
 */
export async function addRevision(
  deliverableId: string,
  comment: string,
  authorEmail: string,
  authorUid: string,
  meta?: {
    timecode?: string;
    category?: 'cut' | 'audio' | 'color' | 'caption' | 'general';
  }
): Promise<string> {
  const revId = 'rev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
  const path = `deliverables/${deliverableId}/revisions/${revId}`;

  const item: RevisionItem = cleanForFirestore({
    id: revId,
    deliverableId,
    authorEmail: authorEmail.trim().toLowerCase(),
    authorUid,
    comment: comment.trim(),
    timecode: meta?.timecode?.trim() || undefined,
    category: meta?.category || 'general',
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  try {
    await setDoc(doc(db, 'deliverables', deliverableId, 'revisions', revId), item);
    return revId;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

/**
 * Admin: Update revision status and add resolution reply
 */
export async function updateRevisionStatus(
  deliverableId: string,
  revisionId: string,
  status: 'pending' | 'in_progress' | 'resolved',
  adminReply?: string
): Promise<void> {
  const path = `deliverables/${deliverableId}/revisions/${revisionId}`;
  const payload: any = cleanForFirestore({
    status,
    adminReply: adminReply ? adminReply.trim() : undefined,
  });

  try {
    await updateDoc(doc(db, 'deliverables', deliverableId, 'revisions', revisionId), payload);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

