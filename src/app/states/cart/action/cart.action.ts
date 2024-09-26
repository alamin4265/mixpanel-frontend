import { createAction, props } from "@ngrx/store";
import { CartProduct } from "../../../Model/class";

export const add = createAction('[Cart Product] Add',props<{product: CartProduct}>());
export const remove = createAction('[Cart Product] Remove', props<{productId: number}>());
// export const updateAllState = createAction('[Cart Product] Update all state of cart products',props<{products: CartProduct[]}>());
export const updateProductCount = createAction('[Cart Product] Update Product Count', props<{productId: number, count: number}>())
export const clear = createAction('[Cart Product] Clear');