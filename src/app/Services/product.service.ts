import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(pageIndex: number,pageSize:number){
    const skip = pageIndex* pageSize;
    const resourceUrl: string = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=brand,title,category,description,price,images,stock`;
    return this.http.get(resourceUrl);
  }
}

