import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../Model/class';
import { ToastrService } from 'ngx-toastr';
import { CartState } from '../../states/cart/cart.state';
import { Store } from '@ngrx/store';
import { clear } from '../../states/cart/action/cart.action';
@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  count : number=0;
  paymentSuccess = false; 


  constructor( private store: Store<{ cart: CartState }>, private router: Router, private toastr: ToastrService) {}

  processPayment(form: NgForm) {
    if (form.valid) {
      console.log('Processing payment with dummy data...');
      console.log('Card Number:', form.value.cardNumber);
      console.log('Expiry Date:', form.value.expiryDate);
      console.log('CVV:', form.value.cvv);

      this.paymentSuccess = true;
    } else {
      console.log('Form is invalid');
    }
  }
  Purchase(){
    this.store.dispatch(clear());
    this.paymentSuccess = true;
    this.router.navigate(['/products']);
  }
}
