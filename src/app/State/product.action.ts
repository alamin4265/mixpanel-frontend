import { createAction, props } from '@ngrx/store';
import { CartItem, Product } from '../Model/class';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ cartItem: CartItem }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ cartItem: CartItem }>()
);

export const loadProduct = createAction(
    '[Products Page] Load Products'
);

export const loadProductSuccess = createAction(
    '[Products API] Products Loaded Success',
    props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
    '[Products API] Products Loaded Error',
    props<{ errorMessage: string }>()
);

