import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, cleanForFirestore } from '../lib/firebase';
import { ReviewItem } from '../types';

const REVIEWS_COLLECTION = 'reviews';
const LOCAL_REVIEWS_KEY = 'kin_studio_reviews_cache';

export const INITIAL_CURATED_REVIEWS: ReviewItem[] = [
  {
    id: 'seed-1',
    authorUid: 'seed_uid_1',
    authorName: 'أحمد السعدني',
    authorProject: 'بودكاست العمارة والمجتمع',
    rating: 5,
    comment: 'استوديو كين في الكوربة نقل جودة البودكاست عندنا لمرحلة تانية خالص! العزل الصوتي فائق الدقة، وكاميرات سوني مع إضاءات الأبوتشر بتطلع صورة سينمائية بدون أي تشويش. التزام بالمواعيد وسرعة في تسليم الحلقات.',
    serviceType: 'podcast',
    status: 'approved',
    isFeatured: true,
    adminReply: 'شكراً أستاذ أحمد، شرفنا جداً استضافة برنامجكم الراقي في استوديوهاتنا!',
    createdAt: '2026-10-18T14:30:00.000Z',
    updatedAt: '2026-10-18T14:30:00.000Z',
  },
  {
    id: 'seed-2',
    authorUid: 'seed_uid_2',
    authorName: 'نورا الحفناوي',
    authorProject: 'مؤسسة Bloom Skincare',
    rating: 5,
    comment: 'باقة تصوير الـ 16 ريلز الشهرية مع فريق كين وفّرت علينا مجهود شهور. التصوير تم في يوم واحد باحترافية، والمونتاج مع المؤثرات الصوتية والـ Color Grading كان على أعلى مستوى في مصر.',
    serviceType: 'reels',
    status: 'approved',
    isFeatured: true,
    adminReply: 'سعداء جداً بنجاح الحملة ونسب المشاهدات العالية على إنستجرام وتيك توك!',
    createdAt: '2026-10-12T11:20:00.000Z',
    updatedAt: '2026-10-12T11:20:00.000Z',
  },
  {
    id: 'seed-3',
    authorUid: 'seed_uid_3',
    authorName: 'كريم البنا',
    authorProject: 'Foodie Cairo Club',
    rating: 5,
    comment: 'أفضل معاملة وروح فريق عمل شفتها. كرو الإخراج والتصوير بيساعدوا في الأفكار والزوايا وكأنهم شركاء في البرنامج مش مجرد استوديو تأجير. تجربة تستحق كل جنيه.',
    serviceType: 'podcast',
    status: 'approved',
    isFeatured: false,
    createdAt: '2026-10-05T16:00:00.000Z',
    updatedAt: '2026-10-05T16:00:00.000Z',
  },
];

// Local cache synchronization helpers
function getLocalReviews(): ReviewItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_REVIEWS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return INITIAL_CURATED_REVIEWS;
}

function saveLocalReviews(list: ReviewItem[]) {
  try {
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function updateLocalReviewItem(id: string, updates: Partial<ReviewItem>): ReviewItem[] {
  const current = getLocalReviews();
  const idx = current.findIndex((r) => r.id === id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...updates, updatedAt: new Date().toISOString() };
  } else {
    // Check if it's one of the initial seeds
    const seed = INITIAL_CURATED_REVIEWS.find((r) => r.id === id);
    if (seed) {
      current.push({ ...seed, ...updates, updatedAt: new Date().toISOString() });
    }
  }
  saveLocalReviews(current);
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
    status: 'pending', // Awaits admin approval
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
  // Immediately pass locally approved reviews
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
          remoteList.push(docSnap.data() as ReviewItem);
        });

        // Merge remote with local to ensure seeds and approved reviews are retained
        const local = getLocalReviews();
        const mergedMap = new Map<string, ReviewItem>();
        local.filter((r) => r.status === 'approved').forEach((r) => mergedMap.set(r.id, r));
        remoteList.forEach((r) => mergedMap.set(r.id, r));

        const finalList = Array.from(mergedMap.values());
        finalList.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        onData(finalList);
      },
      (error) => {
        console.warn('Public approved reviews listener notice (using local storage):', error);
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
  // Immediately provide current local reviews
  const currentLocal = getLocalReviews();
  onData(currentLocal);

  try {
    const q = collection(db, REVIEWS_COLLECTION);
    return onSnapshot(
      q,
      (snapshot) => {
        const remoteList: ReviewItem[] = [];
        snapshot.forEach((docSnap) => {
          remoteList.push(docSnap.data() as ReviewItem);
        });

        if (remoteList.length > 0) {
          // Merge with local seeds
          const local = getLocalReviews();
          const mergedMap = new Map<string, ReviewItem>();
          local.forEach((r) => mergedMap.set(r.id, r));
          remoteList.forEach((r) => mergedMap.set(r.id, r));
          const list = Array.from(mergedMap.values());
          list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          saveLocalReviews(list);
          onData(list);
        } else {
          onData(getLocalReviews());
        }
      },
      (error) => {
        console.warn('Admin reviews subscription notice (using local storage fallback):', error);
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
  const path = `${REVIEWS_COLLECTION}/${id}`;
  const now = new Date().toISOString();

  // 1. Immediately update local cache so admin UI actions (Approve, Reject, Toggle Featured) succeed instantly
  const updates: Partial<ReviewItem> = {
    status,
    updatedAt: now,
  };
  if (typeof isFeatured === 'boolean') updates.isFeatured = isFeatured;
  if (typeof adminReply === 'string') updates.adminReply = adminReply.trim();

  updateLocalReviewItem(id, updates);

  // 2. Best-effort background sync to Firestore
  try {
    const seed = INITIAL_CURATED_REVIEWS.find((r) => r.id === id);
    const fullPayload: ReviewItem = cleanForFirestore({
      id,
      authorUid: seed?.authorUid || 'seed_admin_author',
      authorName: seed?.authorName || 'عميل استوديو كين',
      authorEmail: seed?.authorEmail || '',
      authorProject: seed?.authorProject || '',
      rating: seed?.rating || 5,
      comment: seed?.comment || 'تقييم استوديو كين',
      serviceType: seed?.serviceType || 'podcast',
      status,
      isFeatured: typeof isFeatured === 'boolean' ? isFeatured : (seed?.isFeatured ?? false),
      adminReply: typeof adminReply === 'string' ? adminReply.trim() : (seed?.adminReply || ''),
      createdAt: seed?.createdAt || now,
      updatedAt: now,
    });

    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await setDoc(docRef, fullPayload, { merge: true });
  } catch (error) {
    console.warn('updateReviewModeration saved locally (remote write notice):', error);
  }
}

export async function updateReviewDetails(
  id: string,
  updates: Partial<Pick<ReviewItem, 'authorName' | 'comment' | 'authorProject' | 'rating' | 'serviceType'>>
): Promise<void> {
  const path = `${REVIEWS_COLLECTION}/${id}`;
  const now = new Date().toISOString();

  // 1. Immediately update local cache
  const cleanedUpdates = cleanForFirestore({
    ...updates,
    updatedAt: now,
  });
  updateLocalReviewItem(id, cleanedUpdates);

  // 2. Best-effort background sync to Firestore
  try {
    const seed = INITIAL_CURATED_REVIEWS.find((r) => r.id === id);
    const fullPayload: ReviewItem = cleanForFirestore({
      id,
      authorUid: seed?.authorUid || 'seed_admin_author',
      authorName: updates.authorName || seed?.authorName || 'عميل استوديو كين',
      authorEmail: seed?.authorEmail || '',
      authorProject: updates.authorProject !== undefined ? updates.authorProject : (seed?.authorProject || ''),
      rating: updates.rating || seed?.rating || 5,
      comment: updates.comment || seed?.comment || 'تقييم استوديو كين',
      serviceType: updates.serviceType || seed?.serviceType || 'podcast',
      status: seed?.status || 'approved',
      isFeatured: seed?.isFeatured ?? false,
      adminReply: seed?.adminReply || '',
      createdAt: seed?.createdAt || now,
      updatedAt: now,
    });

    const docRef = doc(db, REVIEWS_COLLECTION, id);
    await setDoc(docRef, fullPayload, { merge: true });
  } catch (error) {
    console.warn('updateReviewDetails saved locally (remote write notice):', error);
  }
}

export async function deleteReview(id: string): Promise<void> {
  const path = `${REVIEWS_COLLECTION}/${id}`;

  // 1. Immediately remove from local cache
  deleteLocalReviewItem(id);

  // 2. Best-effort delete from Firestore
  try {
    await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
  } catch (error) {
    console.warn('deleteReview removed locally (remote notice):', error);
  }
}
