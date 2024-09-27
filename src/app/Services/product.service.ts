import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getProducts(pageIndex: number, pageSize: number) {
        const skip = pageIndex * pageSize;
        const resourceUrl: string = `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}&select=brand,title,category,description,price,images,stock`;
        return this.http.get(resourceUrl);
    }
}