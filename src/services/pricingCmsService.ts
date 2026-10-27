import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, cleanForFirestore } from '../lib/firebase';
import { PackageCMSItem, PromotionItem } from '../types';

const PACKAGES_COLLECTION = 'packages_cms';
const PROMOTIONS_COLLECTION = 'promotions';

// Local storage backup keys
const LOCAL_PACKAGES_KEY = 'kin_cms_packages_cache';
const LOCAL_PROMOTIONS_KEY = 'kin_cms_promotions_cache';

function getLocalPackages(): PackageCMSItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_PACKAGES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalPackage(pkg: PackageCMSItem) {
  try {
    const list = getLocalPackages().filter((p) => p.id !== pkg.id);
    list.push(pkg);
    localStorage.setItem(LOCAL_PACKAGES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function removeLocalPackage(id: string) {
  try {
    const list = getLocalPackages().filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_PACKAGES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

// --- Dynamic Pricing Packages ---

export function subscribePackagesCMS(
  onData: (packages: PackageCMSItem[]) => void,
  onError?: (err: unknown) => void
) {
  try {
    return onSnapshot(
      collection(db, PACKAGES_COLLECTION),
      (snapshot) => {
        const list: PackageCMSItem[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as PackageCMSItem);
        });
        if (list.length > 0) {
          localStorage.setItem(LOCAL_PACKAGES_KEY, JSON.stringify(list));
          onData(list);
        } else {
          // If empty in remote, pass local cached if available
          const local = getLocalPackages();
          onData(local.length > 0 ? local : []);
        }
      },
      (error) => {
        if (onError) onError(error);
        console.warn('Packages CMS subscription notice:', error);
        const local = getLocalPackages();
        if (local.length > 0) onData(local);
      }
    );
  } catch (error) {
    if (onError) onError(error);
    const local = getLocalPackages();
    if (local.length > 0) onData(local);
    return () => {};
  }
}

export async function savePackageCMS(pkg: PackageCMSItem): Promise<void> {
  const path = `${PACKAGES_COLLECTION}/${pkg.id}`;
  const payload = cleanForFirestore({
    ...pkg,
    updatedAt: new Date().toISOString(),
  });
  // Always update local cache immediately so UI is instant and resilient
  saveLocalPackage(payload as PackageCMSItem);

  try {
    await setDoc(doc(db, PACKAGES_COLLECTION, pkg.id), payload);
  } catch (error) {
    console.warn('savePackageCMS persisted to local cache due to firestore error:', error);
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deletePackageCMS(id: string): Promise<void> {
  removeLocalPackage(id);
  const path = `${PACKAGES_COLLECTION}/${id}`;
  try {
    await deleteDoc(doc(db, PACKAGES_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- Limited-Time Promotions ---

export function subscribePromotions(
  onData: (promotions: PromotionItem[]) => void,
  onError?: (err: unknown) => void
) {
  try {
    return onSnapshot(
      collection(db, PROMOTIONS_COLLECTION),
      (snapshot) => {
        const list: PromotionItem[] = [];
        snapshot.forEach((d) => {
          list.push(d.data() as PromotionItem);
        });
        onData(list);
      },
      (error) => {
        if (onError) onError(error);
        console.warn('Promotions subscription notice:', error);
      }
    );
  } catch (error) {
    if (onError) onError(error);
    return () => {};
  }
}

export async function savePromotion(promo: Omit<PromotionItem, 'id'> & { id?: string }): Promise<string> {
  const id = promo.id || `promo_${Date.now()}`;
  const path = `${PROMOTIONS_COLLECTION}/${id}`;
  const payload: PromotionItem = cleanForFirestore({
    ...promo,
    id,
    createdAt: promo.createdAt || new Date().toISOString(),
  });

  try {
    await setDoc(doc(db, PROMOTIONS_COLLECTION, id), payload);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deletePromotion(id: string): Promise<void> {
  const path = `${PROMOTIONS_COLLECTION}/${id}`;
  try {
    await deleteDoc(doc(db, PROMOTIONS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function isPromotionActive(promo: PromotionItem): boolean {
  if (!promo.isActive) return false;
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  if (promo.startDate && todayStr < promo.startDate) return false;
  if (promo.endDate && todayStr > promo.endDate) return false;
  return true;
}
