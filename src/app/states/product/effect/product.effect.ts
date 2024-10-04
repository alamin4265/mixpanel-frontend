import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../../Services/product.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadProduct, loadProductFailure, loadProductSuccess } from "../action/product.action";

@Injectable()
export class ProductEffects{
    loadProducts$: any;

    constructor( 
        private actions$: Actions,
        private productService: ProductService)
    {
         this.loadProducts$ = createEffect(
            ()=>
                this.actions$.pipe(
                    ofType(loadProduct),
                    exhaustMap(({pageSize,pageIndex}) =>
                    this.productService.getProducts(pageIndex-1,pageSize)
                    .pipe(
                        map((response: any)=> loadProductSuccess({products: response.product, totalItems: response.total})),
                        catchError((error: {message:string}) => of(loadProductFailure({errorMessage: "Fail to load products"})))
                        )
                    ) 
                )
         );
    }
}
