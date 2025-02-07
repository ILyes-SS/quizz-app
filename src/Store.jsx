import { create } from "zustand";

export const useStore = create((set) => ({
  categoryId: null,
  setCategoryId: (id) => set((state) => ({ categoryId: id })),
}));
