import { Component, DoCheck, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem, CartProduct } from '../../Model/class';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartState } from '../../states/cart/cart.state';
import { add, remove, updateProductCount } from '../../states/cart/action/cart.action';
import { selectCartProducts, selectTotalCount, selectTotalPrice } from '../../states/cart/selector/cart.selector';
import { Subscription, take } from 'rxjs';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';


@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit , OnDestroy{
  @Input() product: any;
  quantity: number = 1;
  feedbackMessage: string | null = null;
  cartItems: CartItem[] = [];
  carProducts: CartProduct[] = [];
  totalPrice = 0;
  productSubscription:  Subscription | undefined; 
 
  
  constructor(
    private store: Store<{ cart: CartState }>,
    private mixpanelService: MixpanelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.mixpanelService.trackEvent('Addtocart', { TotalPrice: this.totalPrice });
          // const localUser = localStorage.getItem('samia@gmail.com'); 
    this.mixpanelService.eventWithUserInfo('samia@gmail.com');
  }
  
  increment(item: any) {
    this.store.dispatch(updateProductCount({ productId: item.id, count: item.count + 1}));
    this.loadCartItems();
  }

  decrement(item: any) {
    if (item.count > 1) {
      this.store.dispatch(updateProductCount({ productId: item.id, count: item.count - 1}));
      this.loadCartItems();
    } else {
      this.removeItem(item); 
    }
 
  }
  removeItem(item: any) {
    this.store.dispatch(remove({ productId: item.id}));
    this.loadCartItems(); 
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  private loadCartItems() {
   this.productSubscription = this.store.select('cart').pipe(take(1)).subscribe(cartState => {
      this.carProducts=cartState.cartProducts;
      this.totalPrice = cartState.totalPrice
    })

  }

  ngOnDestroy(): void {
   alert("ngOnDestroy");
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
