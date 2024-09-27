import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ProductService } from '../Services/product.service';
import { loadProduct, loadProductFailure, loadProductSuccess } from "./product.action";

@Injectable()
export class ProductsEffects {
    loadProducts$: any;

    constructor(
        private actions$: Actions,
        private productService: ProductService
    ) {
        this.loadProducts$ = createEffect(
            () =>
                this.actions$.pipe(
                    ofType(loadProduct),
                    exhaustMap(({ pageSize, pageIndex }) => this.productService.getProducts(pageIndex-1, pageSize)
                        .pipe(
                            map((response: any) => loadProductSuccess({ products: response.products, totalItems: response.total })),
                            catchError((error: { message: string }) => of(loadProductFailure({ errorMessage: "Fail to load products" })))
                        )
                    )
                )
        );
    }
} 