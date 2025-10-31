import { create } from 'zustand';

export const useRecipient = create((set) => ({
  recipient: null,
  recipientError: '',
  isRecipientLoading: false,

  resetRecipient: () => set({ recipient: null }),
  searchRecipient: async (payload) => {
    set({ isRecipientLoading: true, recipientError: '' });
    try {
      const response = await fetch("/api/recipients/stars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.ok) set({ recipient: data.recipient });
    } catch (err) {
      set({ recipientError: err?.message || 'Network error' });
    } finally {
      set({ isRecipientLoading: false });
    }
  }
}));
