import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (item) => {
    if (!get().cart.some((cartItem) => cartItem.id == item.id)) {
      set((state) => ({ cart: [...state.cart, item] }));
    }
  },
  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id != id) }));
  },
}));

export default useCartStore;
