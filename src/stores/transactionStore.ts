import { create } from 'zustand';
import { 
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Transaction } from '../types';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  fetchTransactions: (userId: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  loading: false,
  error: null,

  addTransaction: async (transaction) => {
    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'transactions'), {
        ...transaction,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await get().fetchTransactions(transaction.userId);
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateTransaction: async (id, transaction) => {
    try {
      set({ loading: true, error: null });
      const docRef = doc(db, 'transactions', id);
      await updateDoc(docRef, {
        ...transaction,
        updatedAt: new Date()
      });
      await get().fetchTransactions(transaction.userId!);
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTransaction: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteDoc(doc(db, 'transactions', id));
      set(state => ({
        transactions: state.transactions.filter(t => t.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchTransactions: async (userId) => {
    try {
      set({ loading: true, error: null });
      const q = query(
        collection(db, 'transactions'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Transaction[];
      set({ transactions });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));