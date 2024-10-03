import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MixpanelService } from '../../../Shared/Services/mixpanel.service';
import { CartService } from '../../../Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { CartState } from '../../../states/cart/cart.state';
import { take } from 'rxjs';
import { add, updateProductCount } from '../../../states/cart/action/cart.action';
import { CartProduct } from '../../../Model/class';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule,CommonModule,JsonPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, AfterContentInit{
  prod: any;
  @ViewChild('categoryElement') categoryElement!: ElementRef;
  count: number = 1;
  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private mixpanelService: MixpanelService,
    private cartService: CartService,
    private toastr: ToastrService,
    private store: Store<{ cart: CartState }>
  ) {}
    
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.http.get(`https://dummyjson.com/products/${id}`).subscribe((result: any) => {
          this.prod = result;
          this.mixpanelService.trackEvent('ProductDetail', { Category: this.prod.category });
          // const localUser = localStorage.getItem('samia@gmail.com');
          
          this.mixpanelService.eventWithUserInfo('samia@gmail.com');
        });
      }
  }

  ngAfterContentInit(): void {
    // alert("ngAfterContentInit"); 

  }

  ngAfterViewInit(): void { 
    // alert("ngAfterViewInit"); 
    // this.prod.category="Watch"
    // this.updateCategory('Watch');
    
  }
  
  ngAfterViewChecked(): void {
    // alert("ngAfterViewChecked");
  }
  
  updateCategory(newCategory: string): void {
    this.prod.category = newCategory;
    this.categoryElement.nativeElement.innerText = `Category: ${this.prod.category}`;
  }

  addToCart(product: any){    
    let existingProduct  ;
   
    this.store.select('cart').pipe(take(1)).subscribe(cartState => {
      existingProduct = cartState.cartProducts.find(p => p.id === product.id);
      if(existingProduct)this.count = existingProduct?.count +1;
    });

    if (existingProduct) {
      this.store.dispatch(updateProductCount({ productId: product.id, count: this.count}));
    } else {
      const cartProduct: CartProduct = {
        id: product.id,
        brand: product.brand,
        title: product.title,
        category: product.category,
        stock: product.stock,
        count:this.count,
        price: product.price,
        images: product.images
      };

      this.store.dispatch(add({ product: cartProduct }));
    }
    this.count = 1; 
  }

  goBack() {
    this.router.navigate(['/products']);
  }
   
}
