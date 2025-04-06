import { create } from "zustand";
// Note: 'create' as a default export is a deprecated import.

interface CounterState {
  count: number;
  increment: () => void;
}

const useStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
