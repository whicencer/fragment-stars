import { create } from 'zustand';

export const useTransaction = create((set) => ({
  transaction: null,
  transactionError: '',
  isTransactionLoading: false,

  createTransaction: async (payload) => {
    set({ isTransactionLoading: true, transactionError: '' });
    try {
      const response = await fetch("/api/payments/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.ok) set({ transaction: data.transaction });
    } catch (err) {
      set({ transactionError: err?.message || 'Network error' });
    } finally {
      set({ isTransactionLoading: false });
    }
  }
}));