import { createReducer, on } from "@ngrx/store";
// import { ProductState } from "../product.state";
import { loadProduct, loadProductFailure, loadProductSuccess } from "../action/product.action";
import { Product } from "../../../Model/class";

// export const initialState: ProductState = {
//     products: [],
//     totalItems: 0,
//     error: ''
// }
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
    on(loadProduct,(state)=>{
        return state;
    }),
    on(loadProductSuccess,(state, {products, totalItems})=>{
        return{
            ...state,
            products,
            totalItems,
            error: null
        }
    }),
    on(loadProductFailure,(state,{errorMessage})=>{
        return{
            ...state,
            error: errorMessage
        };
    })
);