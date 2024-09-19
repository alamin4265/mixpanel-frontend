import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  totalProducts: number = 0; 
  pageSize: number = 10;
  pageIndex: number = 0;
  productList: any [] =[];
  
  constructor(private http : HttpClient, private router: Router) { }
  productOBJ: any ={
    "id":0,
    "brand":"",
    "title":"",
    "category": "",
    "description":"",
    "price": "",
    "images": "",
    "stock": ""
  }


  createProduct() {
    if (this.productOBJ) {
      const newId = this.productList.length > 0 ? this.productList[this.productList.length - 1].id + 1 : 1;
      this.productOBJ.id = newId;
  
      this.http.post(`https://dummyjson.com/products/add`, this.productOBJ, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe((result: any) => {
        this.productList.push(result); 
        alert('Product added');
        this.router.navigate(['/products']);
      });
    }
  }
  goBack() {
    this.router.navigate(['/products']);
  }

}
