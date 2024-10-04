import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../Model/class';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule,LayoutComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export default class AddProductComponent {
  totalProducts: number = 0; 
  pageSize: number = 10;
  pageIndex: number = 0;
  productList: any [] =[];
  prod : Product = new Product();
  constructor(private http : HttpClient, private router: Router) { }
  productOBJ: any ={
    "id":0,
    "brand":"",
    "name":0,
    "description":"",
    "price": 0,
    "stock": 0
  }
  apiUrl = environment.baseAPI;
  createProduct() {
 
    if (this.productOBJ) {
      const newId = this.productList.length > 0 ? this.productList[this.productList.length - 1].id + 1 : 1;
      this.productOBJ.id = newId;
      const api = this.apiUrl+`Product`;
      this.productOBJ.price = Number(this.productOBJ.price); 
      this.productOBJ.stock = Number(this.productOBJ.stock); 
      this.http.post(api, this.productOBJ)
        .subscribe((result: any) => {
          this.productList.push(result); 
          this.router.navigate(['/products']);        
        });
        
    }

    
  }
  getproduct()
  {
    const api = this.apiUrl+`Product/1`;
     this.http.get(api).subscribe((response: any) => {
  
      this.productOBJ.brand= response.brand;
      this.prod.brand=response.brand;
    });
  }
  goBack() {
    this.router.navigate(['/products']);
  }

}
