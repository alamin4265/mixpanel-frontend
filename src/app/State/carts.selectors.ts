import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartStore } from "../Model/class";


export const cartStore = createFeatureSelector<CartStore>('cart');

export const selectCartCount = createSelector(
    cartStore,
    (state: CartStore) => state.cartCount
);

export const selectCarts = createSelector(
    cartStore,
    (state: CartStore) => state.cartItems
);

export const selectCartsTotalPrice = createSelector(
    cartStore,
    (state: CartStore) => state.totalPrice
);
