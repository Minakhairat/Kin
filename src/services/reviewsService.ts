import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db, cleanForFirestore } from '../lib/firebase';
import { ReviewItem } from '../types';

const REVIEWS_COLLECTION = 'reviews';
const LOCAL_REVIEWS_KEY = 'kin_studio_reviews_cache';

// No fake or mock seeds — only authentic client reviews are accepted and displayed
export const INITIAL_CURATED_REVIEWS: ReviewItem[] = [];

// Local cache synchronization helpers (strictly filters out any legacy seed or fake items)
function getLocalReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Strip any legacy fake seeds
        const realOnly = parsed.filter(
          (r: ReviewItem) =>
            r &&
            r.id &&
            !r.id.startsWith('seed-') &&
            !r.authorUid?.startsWith('seed_') &&
            r.authorName !== 'أحمد السعدني' &&
            r.authorName !== 'نورا الحفناوي' &&
            r.authorName !== 'كريم البنا'
        );
        if (realOnly.length !== parsed.length) {
          saveLocalReviews(realOnly);
        }
        return realOnly;
      }
    }
  } catch {
    // fallback
  }
  return [];
}

function saveLocalReviews(list: ReviewItem[]) {
  try {
    const realOnly = list.filter(
      (r) =>
        r &&
        r.id &&
        !r.id.startsWith('seed-') &&
        !r.authorUid?.startsWith('seed_') &&
        r.authorName !== 'أحمد السعدني' &&
        r.authorName !== 'نورا الحفناوي' &&
        r.authorName !== 'كريم البنا'
    );
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(realOnly));
  } catch {
    // ignore
  }
}

function updateLocalReviewItem(id: string, updates: Partial<ReviewItem>): ReviewItem[] {
  const current = getLocalReviews();
  const idx = current.findIndex((r) => r.id === id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
    saveLocalReviews(current);
  }
  return current;
}

function deleteLocalReviewItem(id: string): ReviewItem[] {
  const current = getLocalReviews().filter((r) => r.id !== id);
  saveLocalReviews(current);
  return current;
}

export async function submitReview(
  authorUid: string,
  authorName: string,
  authorEmail: string | undefined,
  rating: number,
  comment: string,
  serviceType: 'podcast' | 'reels' | 'commercial' | 'general',
  authorProject?: string
): Promise<string> {
  const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const payload: ReviewItem = cleanForFirestore({
    id: reviewId,
    authorUid,
    authorName: authorName.trim(),
    authorEmail: authorEmail?.trim(),
    authorProject: authorProject?.trim() || '',
    rating: Math.min(5, Math.max(1, rating)),
    comment: comment.trim(),
    serviceType,
    status: 'pending', // Awaits admin moderation for verified authenticity
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  });

  // Save to local cache immediately
  const current = getLocalReviews();
  saveLocalReviews([payload, ...current]);

  try {
    await setDoc(doc(db, REVIEWS_COLLECTION, reviewId), payload);
    return reviewId;
  } catch (error) {
    console.warn('submitReview saved to local cache due to firestore notice:', error);
    return reviewId;
  }
}

export function subscribeApprovedReviews(
  onData: (reviews: ReviewItem[]) => void,
  onError?: (err: unknown) => void
) {
  // Immediately pass locally approved real reviews
  const localApproved = getLocalReviews().filter((r) => r.status === 'approved');
  onData(localApproved);

  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where('status', '==', 'approved')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const remoteList: ReviewItem[] = [];
        snapshot.forEach((docSnap) => {
          const item = docSnap.data() as ReviewItem;
          if (
            item &&
            !item.id?.startsWith('seed-') &&
            !item.authorUid?.startsWith('seed_') &&
            item.authorName !== 'أحمد السعدني' &&
            item.authorName !== 'نورا الحفناوي' &&
            item.authorName !== 'كريم البنا'
          ) {
            remoteList.push(item);
          }
        });

        // Merge remote with local verified submissions
        const local = getLocalReviews();
        const mergedMap = new Map<string, ReviewItem>();
        local.filter((r) => r.status === 'approved').forEach((r) => mergedMap.set(r.id, r));
        remoteList.forEach((r) => mergedMap.set(r.id, r));

        const finalList = Array.from(mergedMap.values());
        finalList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        onData(finalList);
      },
      (error) => {
        console.warn('Public approved reviews listener notice:', error);
        if (onError) onError(error);
        const fallback = getLocalReviews().filter((r) => r.status === 'approved');
        onData(fallback);
      }
    );
  } catch (error) {
    if (onError) onError(error);
    const fallback = getLocalReviews().filter((r) => r.status === 'approved');
    onData(fallback);
    return () => {};
  }
}

export function subscribeAllReviewsForAdmin(
  onData: (reviews: ReviewItem[]) => void,
  onError?: (err: unknown) => void
) {
  // Immediately provide current local real reviews
  const currentLocal = getLocalReviews();
  onData(currentLocal);

  try {
    const q = collection(db, REVIEWS_COLLECTION);
    return onSnapshot(
      q,
      (snapshot) => {
        const remoteList: ReviewItem[] = [];
        snapshot.forEach((docSnap) => {
          const item = docSnap.data() as ReviewItem;
          if (
            item &&
            !item.id?.startsWith('seed-') &&
            !item.authorUid?.startsWith('seed_') &&
            item.authorName !== 'أحمد السعدني' &&
            item.authorName !== 'نورا الحفناوي' &&
            item.authorName !== 'كريم البنا'
          ) {
            remoteList.push(item);
          }
        });

        // Merge with local real reviews
        const local = getLocalReviews();
        const mergedMap = new Map<string, ReviewItem>();
        local.forEach((r) => mergedMap.set(r.id, r));
        remoteList.forEach((r) => mergedMap.set(r.id, r));
        const list = Array.from(mergedMap.values());
        list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        saveLocalReviews(list);
        onData(list);
      },
      (error) => {
        console.warn('Admin reviews subscription notice:', error);
        if (onError) onError(error);
        onData(getLocalReviews());
      }
    );
  } catch (error) {
    if (onError) onError(error);
    onData(getLocalReviews());
    return () => {};
  }
}

export async function updateReviewModeration(
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  isFeatured?: boolean,
  adminReply?: string
): Promise<void> {
  const now = new Date().toISOString();

  // 1. Immediately update local cache so admin UI actions succeed instantly
  const updates: Partial<ReviewItem> = {
    status,
    updatedAt: now,
  };
  if (typeof isFeatured === 'boolean') updates.isFeatured = isFeatured;
  if (typeof adminReply === 'string') updates.adminReply = adminReply.trim();

  updateLocalReviewItem(id, updates);

  // 2. Sync to Firestore
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    const cleanUpdates = cleanForFirestore({
      status,
      ...(typeof isFeatured === 'boolean' ? { isFeatured } : {}),
      ...(typeof adminReply === 'string' ? { adminReply: adminReply.trim() } : {}),
      updatedAt: now,
    });
    await setDoc(docRef, cleanUpdates, { merge: true });
  } catch (error) {
    console.warn('updateReviewModeration saved locally (remote write notice):', error);
  }
}

export async function updateReviewDetails(
  id: string,
  updates: Partial<Pick<ReviewItem, 'authorName' | 'comment' | 'authorProject' | 'rating' | 'serviceType'>>
): Promise<void> {
  const now = new Date().toISOString();

  // 1. Immediately update local cache
  const cleanedUpdates = cleanForFirestore({
    ...updates,
    updatedAt: now,
  });
  updateLocalReviewItem(id, cleanedUpdates);

  // 2. Sync to Firestore
  try {
    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await setDoc(docRef, cleanedUpdates, { merge: true });
  } catch (error) {
    console.warn('updateReviewDetails saved locally (remote write notice):', error);
  }
}

export async function deleteReview(id: string): Promise<void> {
  // 1. Immediately remove from local cache
  deleteLocalReviewItem(id);

  // 2. Delete from Firestore
  try {
    await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
  } catch (error) {
    console.warn('deleteReview removed locally (remote notice):', error);
  }
}
