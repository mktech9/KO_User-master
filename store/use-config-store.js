import { create } from "zustand";

const useConfig = create((set) => ({
  currency: "",
  language: "/auto/en",
  setConfig: (data, field) => set((state) => ({ [field]: data })),
}));

export default useConfig;
