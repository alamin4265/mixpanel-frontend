import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MixpanelService } from '../../../Shared/Services/mixpanel.service';
import { CartService } from '../../../Services/cart.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private mixpanelService: MixpanelService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
    
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.http.get(`https://dummyjson.com/products/${id}`).subscribe((result: any) => {
          this.prod = result;
          this.mixpanelService.trackEvent('ProductDetail', { Category: this.prod.category });
        });
      }
  }
  //initialize
  ngAfterContentInit(): void {
    // alert("ngAfterContentInit"); 
    // console.log("ngAfterContentInit on product-details");
  }

  ngAfterViewInit(): void { 
    alert("ngAfterViewInit"); 
    console.log('ngAfterViewInit: View has been initialized'); 
    // this.prod.category="Watch"
    this.updateCategory('Watch');
    
  }
  
  ngAfterViewChecked(): void {
    // alert("ngAfterViewChecked");
    console.log('Checked for view changes')  
  }
  
  updateCategory(newCategory: string): void {
    this.prod.category = newCategory;
    this.categoryElement.nativeElement.innerText = `Category: ${this.prod.category}`;
  }

  addToCart(product: any){    
    this.cartService.addToCart(product, 1);
    this.toastr.success('Addtocart Success');
  }

  goBack() {
    this.router.navigate(['/products']);
  }
   
}
