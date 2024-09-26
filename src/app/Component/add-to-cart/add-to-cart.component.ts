import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../Model/class';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

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
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    
    private router: Router
  ) {}

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

  removeItem(item: any) {
    this.cartService.removeProductFromCart(item);
    this.loadCartItems(); // Update cart items after removal
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
  private loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems); 
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
