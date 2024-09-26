import { createAction, props } from '@ngrx/store';
import { CartItem, CartStore } from '../Model/class';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ cartItem: CartItem }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ cartItem: CartItem }>()
);

