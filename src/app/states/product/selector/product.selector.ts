import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../product.state";
// import { ProductState } from "../reducer/product.reducer";


export const productStore = createFeatureSelector<ProductState>('product');

export const selectProduct = createSelector(
    productStore,
    (state: ProductState)=> state.products
);

export const selectProductError = createSelector(
    productStore,
    (state: ProductState) => state.error
);

export const selectTotalProduct = createSelector(
    productStore,
    (state: ProductState) => state.totalItems
);