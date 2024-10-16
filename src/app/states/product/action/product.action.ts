import { createAction, props } from "@ngrx/store";
import { CartProduct, Product } from "../../../Model/class";


export const loadProduct = createAction(
    '[Products Pgae] Load Products',
    props<{pageSize: number, pageIndex: number}>()
);

export const loadProductSuccess = createAction(
    '[Products Api] Products Loaded Success',
    props<{products: Product[], totalItems: 0}>()
);

export const loadProductFailure = createAction(
    '[Products Api] Products Loaded Error',
    props<{errorMessage: string}>()
);