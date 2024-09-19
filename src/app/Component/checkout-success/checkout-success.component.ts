import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../Model/class';
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


  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.count = this.cartService.getTotalCount();
  }

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
    this.cartService.clearCart();
    this.paymentSuccess = true;
    alert('payment-succuess');
    this.router.navigate(['/products']);
  }
}
