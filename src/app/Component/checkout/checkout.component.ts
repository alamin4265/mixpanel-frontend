import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItem, CartProduct } from '../../Model/class';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';
import { Store } from '@ngrx/store';
import { CartState } from '../../states/cart/cart.state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartProducts: CartProduct[] = [];
  totalPrice = 0;
  count : number=0;
  constructor(
    private router: Router,
    private mixpanelService: MixpanelService,
    private store: Store<{ cart: CartState }>,
    ) {}

  ngOnInit(): void {
    this.loadCartItems(); 
  }
  private loadCartItems() {
    this.store.select('cart').subscribe(cartState => {
      this.cartProducts= cartState.cartProducts;
      this.totalPrice = cartState.totalPrice;
      this.count = cartState.totalCount;
    })
  }
  checkout() { 
    if (this.cartProducts.length > 0) {
      this.mixpanelService.trackEvent('Checkout', { eventType: 'checkout'});
      this.router.navigate(['/checkout-success']);
    } else {
      console.error('No items in the cart for checkout.');
    }
  }
}
