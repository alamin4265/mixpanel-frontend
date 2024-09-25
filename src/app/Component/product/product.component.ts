import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { afterNextRender, afterRender, AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductCardComponent } from './product-card/product-card.component';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe, MatPaginatorModule, ProductCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, AfterViewInit,AfterViewChecked, OnDestroy{
  totalProducts: number = 0; 
  pageSize: number = 10;
  pageIndex: number = 0;
  productList: any [] =[];
  loading:boolean = true;    
  searchQuery: string = ''; 
  apiUrl = environment.baseAPI;
  backProd: any [] =[];
  productSubscription:  Subscription | undefined; 
  @ViewChildren(ProductCardComponent) productCards!: QueryList<ProductCardComponent>;
  @ViewChild('productcard') child!: ProductCardComponent;
  
  constructor(private http : HttpClient, private router: Router, private toastr: ToastrService) {
   }
  productOBJ: any ={
    "id":0,
    "brand":"",
    "title":"",
    "category": "",
    "description":"",
    "price": "",
    "images": "",
    "stock": "",
  }
  ngOnInit(): void{ 
    this.fetchProducts(this.pageIndex, this.pageSize);
  }
  fetchProducts(pageIndex: number, pageSize: number): void {
    this.loading = true;
    const skip = pageIndex * pageSize;
    const apiUrl = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=brand,title,category,description,price,images,stock`;
    // const api = this.apiUrl+`Product/pagination?limit=${pageSize}&skip=${skip}`;
    // this.http.get(api).subscribe((response: any) => {
    //   debugger;
    //   this.productList = response.products;
    //   this.totalProducts = response.total; 
    //   this.loading = false;
    // });
   this.productSubscription = this.http.get(apiUrl).subscribe((response: any) => {
      this.productList = response.products;
      this.totalProducts = response.total; 
      this.loading = false;
    });
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchProducts(this.pageIndex, this.pageSize); 
  }
  createProduct() {
    if (this.productOBJ) {
      let last:any = this.productList[this.productList.length-1];
      this.productOBJ.id = last.id + 1; 
      let json = JSON.stringify(this.productOBJ);
      console.log(json);
    
      this.http.post(`https://dummyjson.com/products/add`, json,  {
        headers: { 'Content-Type': 'application/json' }
      })
        .subscribe((result: any) => {
          this.productList[last.id] = result;            
              });
    }
  }

  updateProduct() {
    if (this.productOBJ) {
   
      let json = JSON.stringify(this.productOBJ);
      this.http.patch(`https://dummyjson.com/products/${this.productOBJ.id}`, json)
        .subscribe((result: any) => {
          const index = this.productList.findIndex(p => p.id === this.productOBJ.id);
          if (index !== -1) {
            result.brand = this.productOBJ.brand;
            result.title = this.productOBJ.title;
            this.productList[index] = result;         
          }
          this.productOBJ = null; 
        });
    }
  }
  
  onEdit(data: any) {
    this.productOBJ = { ...data}; 
  }

  viewProductDetails(id: number) {
    this.router.navigate(['/product-details', id]);
  }

  onDelete(id: number){
    this.http.delete("https://dummyjson.com/products/"+id).subscribe((result:any)=>{
      this.productList = this.productList.filter(product => product.id !== id);
    }); 
  }
  
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.productList = this.productList;  
    } else {
      this.loading = true;
      this.http.get(`https://dummyjson.com/products/search?q=${this.searchQuery}`)
        .subscribe((response: any) => {
          this.productList = response.products; 
          this.loading = false;
        });
    }
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: View has been initialized'); 
    console.log(this.child);
  }

  ngAfterViewChecked(): void {
    console.log('Checked for view changes');
    console.log(this.child);
    this.child.logProductDetails();
    this.productCards.forEach(productCard => {
      //productCard.logProductDetails(); // Call method from child component
    });
  }

  ngOnDestroy(): void {
    console.log('ProductComponent is being destroyed');
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
 
}
