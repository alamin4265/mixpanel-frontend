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
import { take } from 'rxjs';
import { selectCartProducts } from '../../../states/cart/selector/cart.selector';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnChanges{
  @Input() product: any;
  @Output() cardClick = new EventEmitter<number>();
  count: number = 1;
  changeCount: number = 0;
  constructor(private cartService: CartService, private mixpanelService: MixpanelService,  private router: Router, private toastr: ToastrService,
    private renderer: Renderer2, private el: ElementRef, private store: Store<{ cart: CartState }>) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // alert("ngOnChanges");
  }

  addToCart(event: Event) {   
    event.stopPropagation();
    let existingProduct  ;
   
    this.store.select('cart').pipe(take(1)).subscribe(cartState => {
      existingProduct = cartState.cartProducts.find(p => p.id === this.product.id);
      if(existingProduct)this.count = existingProduct?.count +1;
    });

    if (existingProduct) {
      this.store.dispatch(updateProductCount({ productId: this.product.id, count: this.count}));
    } else {
      const cartProduct: CartProduct = {
        id: this.product.id,
        brand: this.product.brand,
        title: this.product.title,
        category: this.product.category,
        stock: this.product.stock,
        count: this.count,
        price: this.product.price,
        images: this.product.images
      };

      this.store.dispatch(add({ product: cartProduct }));
    }
    this.count = 1; 
    this.toastr.success("Successfully Added to Cart");
  }
  onCardClick() {
    this.cardClick.emit(this.product.id);
  }

  logProductDetails() {
    // console.log('Product-card:', this.product);
  }
}
