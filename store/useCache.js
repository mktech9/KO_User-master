import { GetItems } from "@/libs/wishlist-server-utils";
import { create } from "zustand";

const useCache = create((set) => ({
  wishlist: [],
  cart: [],
  address: [],
  delivery: [],
  catalouge: {},
  setCache: (data, field) => set((state) => ({ [field]: data })),
}));

export default useCache;
