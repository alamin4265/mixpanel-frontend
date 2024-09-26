import { CartProduct } from "../../Model/class";

export interface CartState{
    cartProducts: CartProduct[]; //this file will be the model from our initial state
    totalCount: number;
    totalPrice: number;
}