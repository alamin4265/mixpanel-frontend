import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../Model/class';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';
import { Observable, take } from 'rxjs';
import { selectCartCount, selectCarts } from '../../State/carts.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  count : number=0;
  cartItems$?:Observable<CartItem[]>;
  cartItemCount$?:Observable<number>;

  constructor(private cartService: CartService,
    private router: Router,
    private mixpanelService: MixpanelService,
    private store:Store
    ) {
      this.cartItems$ = this.store.select(selectCarts);
      this.cartItemCount$ = this.store.select(selectCartCount);
    }

  ngOnInit(): void {
    
    //this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.count = this.cartService.getTotalCount();
  }

  checkout() { 
    this.cartItems$?.pipe(take(1)).subscribe(cartItems => {
      if (cartItems && cartItems.length > 0) {
        this.mixpanelService.trackEvent('Checkout', { eventType: 'checkout' });
        this.router.navigate(['/checkout-success']);
      } else {
        console.error('No items in the cart for checkout.');
      }
    });
  }
}
