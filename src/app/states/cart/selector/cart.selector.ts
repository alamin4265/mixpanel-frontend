import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../cart.state";

export const selectCartState = createFeatureSelector<CartState>('cart'); //entire state from storage


export const selectCartProducts  = createSelector(
    selectCartState,
    (state: CartState) => state.cartProducts
);

export const selectTotalCount  = createSelector(
    selectCartState,
    (state: CartState)=> state.totalCount
);

export const selectTotalPrice = createSelector(
    selectCartState,
    (state: CartState)=> state.totalPrice
);

