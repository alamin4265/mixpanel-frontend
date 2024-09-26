import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem, CartProduct } from '../../Model/class';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartState } from '../../states/cart/cart.state';
import { add } from '../../states/cart/action/cart.action';
import { selectCartProducts, selectTotalCount, selectTotalPrice } from '../../states/cart/selector/cart.selector';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  @Input() product: any;
  quantity: number = 1;
  feedbackMessage: string | null = null;
  cartItems: CartItem[] = [];
  carProducts: CartProduct[] = [];
  totalPrice = 0;

  constructor(
    // private cartService: CartService,
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  addToCart() {
    // if (this.product) {
    //   this.cartService.addToCart(this.product, this.quantity);
    //   this.feedbackMessage = 'Product added to cart!';      
    //   this.loadCartItems(); 
    // } else {
    //   this.feedbackMessage = 'Failed to add product to cart.';
    // }
    if (this.product) {
      const cartProduct: CartProduct = {
        id: this.product.id,
        brand: this.product.brand,
        title: this.product.title,
        category: this.product.category,
        stock: this.product.stock,
        count: this.quantity,
        price: this.product.price
      };

      // Dispatch the add action to the store
      this.store.dispatch(add({ product: cartProduct }));
      this.feedbackMessage = 'Product added to cart!';
      this.loadCartItems(); // Update cart items after adding
    } else {
      this.feedbackMessage = 'Failed to add product to cart.';
    }
  }
  increment(item: any) {
    debugger;
    item.count = item.count + 1; 
  }

  decrement(item: any) {
    if (item.count > 1) {
      item.count -= 1;
    } else {
      this.removeItem(item); 
    }
 
  }
  removeItem(item: any) {
    // this.cartService.removeProductFromCart(item);
    this.loadCartItems(); // Update cart items after removal
  }

  clearCart() {
    // this.cartService.clearCart();
    this.loadCartItems(); // Update cart items after clearing
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  private loadCartItems() {
    // this.cartItems = this.cartService.getCartItems();
    // console.log(this.cartItems); 
    // this.totalPrice = this.cartService.getTotalPrice();
    debugger;
    this.store.select(selectCartProducts).subscribe(items => {
      debugger;
      this.carProducts=items;
    });
    this.store.select(selectTotalPrice).subscribe(total => {
      this.totalPrice = total;
    });
  }
}
