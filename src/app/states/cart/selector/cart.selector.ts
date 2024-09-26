import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../cart.state";
import { CartProduct } from "../../../Model/class";

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

// export const selectCartProductsById = createSelector(
//     selectCartProducts,
//     (products: CartProduct[], props: {productId: number})=>
//         products.find(product => product.id === props.productId)
// );