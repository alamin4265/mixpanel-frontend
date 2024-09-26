import { createReducer, on } from "@ngrx/store";
import { CartState } from "../cart.state";
import { add, clear, remove, updateProductCount } from "../action/cart.action";

export const initialState : CartState = {
    cartProducts: [],
    totalCount: 0,
    totalPrice: 0
}
export const cartReducer  = createReducer(

    initialState,
    on(add, (state, {product}) =>
    ({
        ...state,
        cartProducts: [...state.cartProducts, product],
        totalCount: state.totalCount + product.count,
        totalPrice: state.totalPrice + product.price * product.count
    })
    ),
    on(remove, (state, {productId}) =>(
        {

            ...state,
            cartProducts: state.cartProducts.filter(p =>  p.id != productId),
            totalCount: state.cartProducts.reduce((count, p) => count+p.count, 0),
            totalPrice: state.cartProducts.reduce((total, p) => total + p.price* p.count , 0)
        }
    )),
    on(updateProductCount, (state, { productId, count }) => {
        const updatedProducts = state.cartProducts.map(p => 
          p.id === productId ? { ...p, count: count } : p
        );
        const updatedTotalPrice = updatedProducts.reduce((total, p) => total + p.price * p.count, 0);
        const updatedTotalCount = updatedProducts.reduce((count, p) => count + p.count, 0);
        
        return { 
          ...state, 
          cartProdcuts: updatedProducts, 
          totalPrice: updatedTotalPrice, 
          totalCounnt: updatedTotalCount 
        };
      }),
    
      on(clear, (state) => ({
        ...state,
        cartProdcuts: [],
        totalPrice: 0,
        totalCounnt: 0
      }))
);