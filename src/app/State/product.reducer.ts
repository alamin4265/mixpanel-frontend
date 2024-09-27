import { Product } from "../Model/class";
import { loadProduct, loadProductFailure, loadProductSuccess } from "./product.action";
import { createReducer, on } from "@ngrx/store";

export interface ProductState {
    products: Product[],
    error: string | null
}
export const initialState: ProductState = {
    products: [],
    error: ''
};

export const productReducer = createReducer(
    initialState,
    on(loadProduct, (state) => {
        return state;
    }),
    on(loadProductSuccess, (state, { products }) => {
        return {
            ...state,
            products,
            error:null
        };
    }),
    on(loadProductFailure, (state, { errorMessage }) => {

        return {
            ...state,
            error: errorMessage
        };
    })
);