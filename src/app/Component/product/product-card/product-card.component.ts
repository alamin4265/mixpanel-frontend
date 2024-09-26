import { Component, EventEmitter, Input,  Output ,OnChanges,DoCheck, SimpleChanges, Renderer2, ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../Services/cart.service';
import { MixpanelService } from '../../../Shared/Services/mixpanel.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartProduct } from '../../../Model/class';
import { CartState } from '../../../states/cart/cart.state';
import { Store } from '@ngrx/store';
import { add, updateProductCount } from '../../../states/cart/action/cart.action';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnChanges, DoCheck{
  @Input() product: any;
  @Output() cardClick = new EventEmitter<number>();
  count: number = 1;
  changeCount: number = 0;
  constructor(private cartService: CartService, private mixpanelService: MixpanelService,  private router: Router, private toastr: ToastrService,
    private renderer: Renderer2, private el: ElementRef, private store: Store<{ cart: CartState }>) {}
  
  //NgonChanges
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges on product-card');
    // alert("ngOnChanges");
  }
  //caled for each changes
  ngDoCheck(): void {
    this.changeCount++;
    console.log('Docheck: counter ' + this.changeCount);
  }
  addToCart(event: Event) {   
    event.stopPropagation();
    this.cartService.addToCart(this.product, this.count);
    this.count = 1;
    this.toastr.success('Addtocart Success');
    // Renderer2 Service
    const button = this.el.nativeElement.querySelector('button');
    this.renderer.setStyle(button, 'color', 'red'); 
    //ngrx
    let existingProduct = false;
    this.store.select('cart').subscribe(cartState => {
      existingProduct = cartState.cartProducts.some(p => p.id === this.product.id);
    });

    if (existingProduct) {
      // Update product count if it already exists
      this.store.dispatch(updateProductCount({ productId: this.product.id, count: this.count }));
    } else {
      // Add the product to the cart
      const cartProduct: CartProduct = {
        id: this.product.id,
        brand: this.product.brand,
        title: this.product.title,
        category: this.product.category,
        stock: this.product.stock,
        count: this.count,
        price: this.product.price
      };

      this.store.dispatch(add({ product: cartProduct }));
    }
    this.count = 1; // Reset count after adding to cart
  }
  onCardClick() {
    this.cardClick.emit(this.product.id);
  }

  logProductDetails() {
    // console.log('Product-card:', this.product);
  }
}
