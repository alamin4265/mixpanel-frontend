import { createReducer, on } from "@ngrx/store";
import { loadProduct, loadProductFailure, loadProductSuccess } from "../action/product.action";
import { Product } from "../../../Model/class";
import { ProductState } from "../product.state";

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