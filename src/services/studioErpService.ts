import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, cleanForFirestore } from '../lib/firebase';
import {
  ExpenseItem,
  FinancialTransactionItem,
  StudioGearItem,
  StudioBookingItem,
} from '../types';

const EXPENSES_COLLECTION = 'expenses';
const TRANSACTIONS_COLLECTION = 'financial_transactions';
const GEAR_COLLECTION = 'gear_inventory';
const BOOKINGS_COLLECTION = 'studio_bookings';

// Local storage cache keys
const LOCAL_EXPENSES_KEY = 'kin_studio_expenses_cache';
const LOCAL_TRANSACTIONS_KEY = 'kin_studio_transactions_cache';
const LOCAL_GEAR_KEY = 'kin_studio_gear_cache';

// Initial realistic presets for studio financials & gear
export const INITIAL_EXPENSES_PRESETS: ExpenseItem[] = [
  {
    id: 'exp_rent_korba',
    title: 'إيجار فيلا استوديو الكوربة (مصر الجديدة)',
    amountEGP: 25000,
    category: 'rent',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    recordedBy: 'admin',
    notes: 'الإيجار الشهري لمقر استوديو كين بالكوربة',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp_crew_podcasts',
    title: 'أجور طاقم التصوير والصوتيات (جلسات الأسبوع)',
    amountEGP: 12500,
    category: 'salaries_crew',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    recordedBy: 'admin',
    notes: 'مهندس صوت + 2 مصورين كاميرات FX3',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'exp_gear_maint',
    title: 'صيانة كروت الذاكرة وميكروفونات Shure SM7B',
    amountEGP: 3200,
    category: 'maintenance',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    recordedBy: 'admin',
    notes: 'فحص دوري واستبدال كابلات XLR',
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_TRANSACTIONS_PRESETS: FinancialTransactionItem[] = [
  {
    id: 'tx_podcast_corp',
    title: 'بودكاست رواد الأعمال (سيزون كامل 6 حلقات)',
    clientName: 'شركة النماء للاستثمار',
    clientPhone: '01001234567',
    serviceType: 'podcast',
    totalAmountEGP: 48000,
    paidAmountEGP: 30000,
    remainingAmountEGP: 18000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'partial',
    sessionDate: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    notes: 'تصوير 3 كاميرات 4K + مونتاج بودكاست وسوشيال ميديا ريلز',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'tx_reels_fashion',
    title: 'باقة ريلز شهرية (12 ريلز احترافي)',
    clientName: 'براند أزياء كاجوال',
    clientPhone: '01119876543',
    serviceType: 'reels',
    totalAmountEGP: 18000,
    paidAmountEGP: 18000,
    remainingAmountEGP: 0,
    paymentMethod: 'instapay',
    paymentStatus: 'paid',
    sessionDate: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    notes: 'تم تسليم كل الريلز على جوجل درايف مع الكابشنز',
    createdAt: new Date().toISOString(),
  },
];

// Local cache helpers
function getLocalExpenses(): ExpenseItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_EXPENSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_EXPENSES_PRESETS;
}

function saveLocalExpenses(list: ExpenseItem[]) {
  try {
    localStorage.setItem(LOCAL_EXPENSES_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function getLocalTransactions(): FinancialTransactionItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_TRANSACTIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return INITIAL_TRANSACTIONS_PRESETS;
}

function saveLocalTransactions(list: FinancialTransactionItem[]) {
  try {
    localStorage.setItem(LOCAL_TRANSACTIONS_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function getLocalGear(): StudioGearItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_GEAR_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [];
}

function saveLocalGear(list: StudioGearItem[]) {
  try {
    localStorage.setItem(LOCAL_GEAR_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function updateLocalGearItem(id: string, updates: Partial<StudioGearItem>) {
  try {
    const current = getLocalGear();
    const idx = current.findIndex((g) => g.id === id);
    if (idx >= 0) {
      current[idx] = { ...current[idx], ...updates };
      saveLocalGear(current);
    }
  } catch {
    // ignore
  }
}

// --- Expenses (Operational Costs) ---

export function subscribeExpenses(
  onData: (expenses: ExpenseItem[]) => void,
  onError?: (err: unknown) => void
) {
  // Immediately provide cached or preset items so the UI is active and metrics display properly
  const initial = getLocalExpenses();
  onData(initial);

  try {
    const q = query(collection(db, EXPENSES_COLLECTION), orderBy('date', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: ExpenseItem[] = [];
        snapshot.forEach((d) => list.push(d.data() as ExpenseItem));
        if (list.length > 0) {
          saveLocalExpenses(list);
          onData(list);
        } else {
          // If empty in remote, maintain local state
          onData(getLocalExpenses());
        }
      },
      (error) => {
        console.warn('Firestore expenses listener notice (using local storage fallback):', error);
        if (onError) onError(error);
        onData(getLocalExpenses());
      }
    );
  } catch (error) {
    console.warn('Error creating expenses query:', error);
    if (onError) onError(error);
    onData(getLocalExpenses());
    return () => {};
  }
}

export async function createExpense(
  expense: Omit<ExpenseItem, 'id' | 'createdAt'>
): Promise<string> {
  const id = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `${EXPENSES_COLLECTION}/${id}`;
  const payload: ExpenseItem = cleanForFirestore({
    ...expense,
    id,
    createdAt: new Date().toISOString(),
  });

  // Always update local cache immediately
  const current = getLocalExpenses().filter((e) => e.id !== id);
  saveLocalExpenses([payload, ...current]);

  try {
    await setDoc(doc(db, EXPENSES_COLLECTION, id), payload);
    return id;
  } catch (error) {
    console.warn('createExpense saved to local cache due to firestore error:', error);
    return id;
  }
}

export async function updateExpense(
  id: string,
  updates: Partial<ExpenseItem>
): Promise<void> {
  const path = `${EXPENSES_COLLECTION}/${id}`;
  const cleaned = cleanForFirestore(updates);

  // Update local cache
  const current = getLocalExpenses();
  const idx = current.findIndex((e) => e.id === id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...cleaned };
    saveLocalExpenses(current);
  }

  try {
    await updateDoc(doc(db, EXPENSES_COLLECTION, id), cleaned);
  } catch (error) {
    console.warn('updateExpense saved to local cache due to firestore error:', error);
  }
}

export async function deleteExpense(id: string): Promise<void> {
  const path = `${EXPENSES_COLLECTION}/${id}`;
  // Remove from local cache
  const current = getLocalExpenses().filter((e) => e.id !== id);
  saveLocalExpenses(current);

  try {
    await deleteDoc(doc(db, EXPENSES_COLLECTION, id));
  } catch (error) {
    console.warn('deleteExpense removed from local cache, firestore notice:', error);
  }
}

// --- Financial Transactions (Revenue) ---

export function subscribeTransactions(
  onData: (transactions: FinancialTransactionItem[]) => void,
  onError?: (err: unknown) => void
) {
  // Immediately pass cached or preset items
  const initial = getLocalTransactions();
  onData(initial);

  try {
    const q = query(collection(db, TRANSACTIONS_COLLECTION), orderBy('sessionDate', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: FinancialTransactionItem[] = [];
        snapshot.forEach((d) => list.push(d.data() as FinancialTransactionItem));
        if (list.length > 0) {
          saveLocalTransactions(list);
          onData(list);
        } else {
          onData(getLocalTransactions());
        }
      },
      (error) => {
        console.warn('Firestore transactions listener notice (using local storage fallback):', error);
        if (onError) onError(error);
        onData(getLocalTransactions());
      }
    );
  } catch (error) {
    console.warn('Error creating transactions query:', error);
    if (onError) onError(error);
    onData(getLocalTransactions());
    return () => {};
  }
}

export async function createTransaction(
  tx: Omit<FinancialTransactionItem, 'id' | 'createdAt'>
): Promise<string> {
  const id = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `${TRANSACTIONS_COLLECTION}/${id}`;
  const remaining = Math.max(0, tx.totalAmountEGP - tx.paidAmountEGP);
  const payload: FinancialTransactionItem = cleanForFirestore({
    ...tx,
    id,
    remainingAmountEGP: remaining,
    createdAt: new Date().toISOString(),
  });

  // Always update local cache immediately
  const current = getLocalTransactions().filter((t) => t.id !== id);
  saveLocalTransactions([payload, ...current]);

  try {
    await setDoc(doc(db, TRANSACTIONS_COLLECTION, id), payload);
    return id;
  } catch (error) {
    console.warn('createTransaction saved to local cache due to firestore error:', error);
    return id;
  }
}

export async function updateTransaction(
  id: string,
  updates: Partial<FinancialTransactionItem>
): Promise<void> {
  const path = `${TRANSACTIONS_COLLECTION}/${id}`;
  const finalUpdates: Partial<FinancialTransactionItem> = { ...updates };
  if (
    typeof finalUpdates.totalAmountEGP === 'number' &&
    typeof finalUpdates.paidAmountEGP === 'number'
  ) {
    finalUpdates.remainingAmountEGP = Math.max(
      0,
      finalUpdates.totalAmountEGP - finalUpdates.paidAmountEGP
    );
  }
  const cleaned = cleanForFirestore(finalUpdates);

  // Update local cache
  const current = getLocalTransactions();
  const idx = current.findIndex((t) => t.id === id);
  if (idx >= 0) {
    current[idx] = { ...current[idx], ...cleaned };
    saveLocalTransactions(current);
  }

  try {
    await updateDoc(doc(db, TRANSACTIONS_COLLECTION, id), cleaned);
  } catch (error) {
    console.warn('updateTransaction saved to local cache due to firestore error:', error);
  }
}

export async function deleteTransaction(id: string): Promise<void> {
  const path = `${TRANSACTIONS_COLLECTION}/${id}`;
  // Remove from local cache
  const current = getLocalTransactions().filter((t) => t.id !== id);
  saveLocalTransactions(current);

  try {
    await deleteDoc(doc(db, TRANSACTIONS_COLLECTION, id));
  } catch (error) {
    console.warn('deleteTransaction removed from local cache, firestore notice:', error);
  }
}

// --- Gear Inventory ---

export function subscribeGear(
  onData: (gear: StudioGearItem[]) => void,
  onError?: (err: unknown) => void
) {
  // Pass local cached gear if available
  const cached = getLocalGear();
  if (cached.length > 0) {
    onData(cached);
  }

  try {
    return onSnapshot(
      collection(db, GEAR_COLLECTION),
      (snapshot) => {
        const list: StudioGearItem[] = [];
        snapshot.forEach((d) => list.push(d.data() as StudioGearItem));
        if (list.length > 0) {
          saveLocalGear(list);
          onData(list);
        } else {
          onData(getLocalGear());
        }
      },
      (error) => {
        console.warn('Gear inventory subscription notice (using local storage):', error);
        if (onError) onError(error);
        onData(getLocalGear());
      }
    );
  } catch (error) {
    console.warn('Gear inventory connection notice:', error);
    if (onError) onError(error);
    onData(getLocalGear());
    return () => {};
  }
}

export async function createGear(
  gear: Omit<StudioGearItem, 'id' | 'updatedAt'> & { id?: string }
): Promise<string> {
  const id = gear.id || `gear_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `${GEAR_COLLECTION}/${id}`;
  const payload: StudioGearItem = cleanForFirestore({
    ...gear,
    id,
    updatedAt: new Date().toISOString(),
  });

  // Always update local cache
  const current = getLocalGear().filter((g) => g.id !== id);
  saveLocalGear([payload, ...current]);

  try {
    await setDoc(doc(db, GEAR_COLLECTION, id), payload, { merge: true });
    return id;
  } catch (error) {
    console.warn('createGear saved to local cache due to firestore error:', error);
    return id;
  }
}

export async function updateGear(id: string, updates: Partial<StudioGearItem>): Promise<void> {
  const path = `${GEAR_COLLECTION}/${id}`;
  const cleaned = cleanForFirestore({
    ...updates,
    updatedAt: new Date().toISOString(),
  });

  // Always update local cache immediately so UI is optimistic and robust
  updateLocalGearItem(id, cleaned);

  try {
    // Using setDoc with merge: true handles both existing and preset unseeded items
    await setDoc(doc(db, GEAR_COLLECTION, id), cleaned, { merge: true });
  } catch (error) {
    console.warn('updateGear saved to local cache due to firestore error:', error);
  }
}

export async function deleteGear(id: string): Promise<void> {
  const path = `${GEAR_COLLECTION}/${id}`;
  const current = getLocalGear().filter((g) => g.id !== id);
  saveLocalGear(current);

  try {
    await deleteDoc(doc(db, GEAR_COLLECTION, id));
  } catch (error) {
    console.warn('deleteGear removed from local cache, firestore notice:', error);
  }
}

// --- Studio Bookings / Calendar Reservations ---

export function subscribeBookings(
  onData: (bookings: StudioBookingItem[]) => void,
  onError?: (err: unknown) => void
) {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('bookingDate', 'asc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const list: StudioBookingItem[] = [];
        snapshot.forEach((d) => list.push(d.data() as StudioBookingItem));
        onData(list);
      },
      (error) => {
        if (onError) onError(error);
        console.warn('Bookings listener notice:', error);
      }
    );
  } catch (error) {
    if (onError) onError(error);
    return () => {};
  }
}

export async function createBookingRequest(
  booking: Omit<StudioBookingItem, 'id' | 'createdAt'>
): Promise<string> {
  const id = `book_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `${BOOKINGS_COLLECTION}/${id}`;
  const payload: StudioBookingItem = cleanForFirestore({
    ...booking,
    id,
    createdAt: new Date().toISOString(),
  });

  try {
    await setDoc(doc(db, BOOKINGS_COLLECTION, id), payload);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateBookingStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled',
  depositPaid?: boolean
): Promise<void> {
  const path = `${BOOKINGS_COLLECTION}/${id}`;
  try {
    const updates: Partial<StudioBookingItem> = cleanForFirestore({ status, depositPaid });
    await updateDoc(doc(db, BOOKINGS_COLLECTION, id), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteBooking(id: string): Promise<void> {
  const path = `${BOOKINGS_COLLECTION}/${id}`;
  try {
    await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// --- CSV Export Utility for Financial Reports ---

export function exportFinancialsToCSV(
  transactions: FinancialTransactionItem[],
  expenses: ExpenseItem[]
): void {
  const rows: string[][] = [
    ['KIN Media Production - Financial Report'],
    ['Generated at', new Date().toLocaleString('ar-EG')],
    [],
    ['--- REVENUE TRANSACTIONS ---'],
    ['Date', 'Title / Client', 'Service', 'Total (EGP)', 'Collected (EGP)', 'Balance Due (EGP)', 'Payment Method', 'Status', 'Notes'],
  ];

  transactions.forEach((tx) => {
    rows.push([
      tx.sessionDate,
      `"${(tx.clientName ? `${tx.clientName} - ` : '') + tx.title}"`,
      tx.serviceType || 'podcast',
      String(tx.totalAmountEGP),
      String(tx.paidAmountEGP),
      String(tx.remainingAmountEGP ?? 0),
      tx.paymentMethod,
      tx.paymentStatus,
      `"${tx.notes || ''}"`,
    ]);
  });

  rows.push([]);
  rows.push(['--- OPERATIONAL EXPENSES ---']);
  rows.push(['Date', 'Expense Title', 'Category', 'Amount (EGP)', 'Invoice Ref', 'Notes']);

  expenses.forEach((exp) => {
    rows.push([
      exp.date,
      `"${exp.title}"`,
      exp.category,
      String(exp.amountEGP),
      exp.invoiceRef || '',
      `"${exp.notes || ''}"`,
    ]);
  });

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.paidAmountEGP || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amountEGP || 0), 0);
  const netProfit = totalRevenue - totalExpenses;

  rows.push([]);
  rows.push(['--- FINANCIAL SUMMARY ---']);
  rows.push(['Total Revenue Collected (EGP)', String(totalRevenue)]);
  rows.push(['Total Expenses (EGP)', String(totalExpenses)]);
  rows.push(['Net Profit / Loss (EGP)', String(netProfit)]);

  const csvContent = '\uFEFF' + rows.map((r) => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `kin_financial_report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
