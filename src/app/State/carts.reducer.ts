import { createReducer, on } from "@ngrx/store";
import { CartItem, CartStore } from "../Model/class";
import { addToCart, removeFromCart } from "./product.action";

export const initialState: CartStore = {
    cartCount: 0,
    totalPrice: 0,
    cartItems: []
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { cartItem }) => {

        const existingItem = state.cartItems.find(item => item.id === cartItem.id);

        let updatedItems: CartItem[];
        if (existingItem) {
            updatedItems = state.cartItems.map(item =>
                item.id === cartItem.id
                    ? { ...item, count: item.count + 1 }
                    : item
            );
        } else {
            updatedItems = [...state.cartItems, { ...cartItem, count: 1 }];
        }
        return {
            ...state,
            cartCount: state.cartCount + 1,
            totalPrice: state.totalPrice + cartItem.price,
            cartItems: updatedItems
        };
    }),

    on(removeFromCart, (state, { cartItem }) => {
        const existingItem = state.cartItems.find(x => x.id === cartItem.id);
        if (!existingItem) {
            return state;
        }
        const updatedItems: CartItem[] = state.cartItems.filter(x => x.id !== cartItem.id);;

        return { ...state, cartCount: state.cartCount - existingItem.count, cartItems: updatedItems, totalPrice: state.totalPrice - (existingItem.price * existingItem.count) };
    })
);