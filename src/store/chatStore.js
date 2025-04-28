import { create } from 'zustand';

export const useChatStore = create((set) => ({
  messages: [],
  isTyping: false,
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  
  setIsTyping: (status) => set(() => ({
    isTyping: status,
  })),
}));
