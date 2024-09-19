import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { SignupLoginComponent } from '../signup-login/signup-login.component';
import { ProductComponent } from '../product/product.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MixpanelService } from '../../Shared/Services/mixpanel.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterModule ,ProductComponent,RouterLink, RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
 loggedUser: any;
 cartItemCount: number = 0;
 constructor(private router: Router,
  private cartService: CartService,
  private mixpanelService: MixpanelService
  ){
    const loacalUser = localStorage.getItem('loggedUser');
    if(loacalUser != null){
      this.loggedUser =JSON.parse(loacalUser);
    }
    this.cartItemCount =this.cartService.getTotalCount();
    this.updateCartItemCount();
 }
  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
 onLogOut(){
  this.mixpanelService.trackEvent('Logout', { eventType: 'logout'});
  localStorage.removeItem('loggedUser');
  this.router.navigate(['/signup-login'])
 }
 viewProduct(){
  this.router.navigate(['/products'])
 }
 
 viewCart(){
  this.router.navigate(['/addtocart'])
 }
 onviewProduct(){
  this.router.navigate(['/products']);
 }
 addProduct(){
  this.router.navigate(['/products/add']);
 }
 private updateCartItemCount() {
  this.cartItemCount = this.cartService.getTotalCount();
}
}
