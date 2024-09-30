import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../Model/class';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { removeFromCart } from '../../State/product.action';
import { Observable } from 'rxjs';
import { selectCarts, selectCartsTotalPrice } from '../../State/carts.selectors';

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
  cartItems$?:Observable<CartItem[]>;
  totalPrice = 0;
  cartItemTotalPrice$?: Observable<number>;

  constructor(
    private cartService: CartService,
    private store: Store,
    private router: Router
  ) {
    this.cartItems$ = this.store.select(selectCarts);
    this.cartItemTotalPrice$ = this.store.select(selectCartsTotalPrice);
  }

  ngOnInit() {
    this.loadCartItems();
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.feedbackMessage = 'Product added to cart!';      
      this.loadCartItems(); 
    } else {
      this.feedbackMessage = 'Failed to add product to cart.';
    }
  }

  removeItem(cartItem: any) {
    //this.cartService.removeProductFromCart(cartItem);
    //this.loadCartItems(); // Update cart items after removal
    this.store.dispatch(removeFromCart({ cartItem }));
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCartItems(); // Update cart items after clearing
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  private loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems); 
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
