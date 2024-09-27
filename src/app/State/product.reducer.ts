import { Product } from "../Model/class";
import { loadProduct, loadProductFailure, loadProductSuccess } from "./product.action";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
    products: Product[],
    totalItems: number,
    error: string | null
}
export const initialState: ProductState = {
    products: [],
    totalItems: 0,
    error: ''
};

export const productReducer = createReducer(
    initialState,
    on(loadProduct, (state) => {
        return state;
    }),
    on(loadProductSuccess, (state, { products, totalItems }) => {
        return {
            ...state,
            products,
            totalItems,
            error: null
        };
    }),
    on(loadProductFailure, (state, { errorMessage }) => {

        return {
            ...state,
            error: errorMessage
        };
    })
);