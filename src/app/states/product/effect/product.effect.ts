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
                    ofType(loadProduct),//Action Creators & filter. can pass multiple
                    exhaustMap(({pageSize,pageIndex}) => 
                // exhaustMap is a higher order pipe operator, which subscribes to the piped observable and for (nearly) each emitted value, returns a new observable, 
                // coming from the function you passed to it.In your case exhaustMap is used, which means if a new value is coming from the source observable, 
                // but the previously mapped observable is not yet completed,
                // the new value coming from the source observable will be ignored.
                    this.productService.getProducts(pageIndex-1,pageSize)
                    .pipe(
                        map((response: any)=> loadProductSuccess({products: response.products, totalItems: response.total})),
                        catchError((error: {message:string}) => of(loadProductFailure({errorMessage: "Fail to load products"})))
                        )
                    ) 
                )
         );
    }
}
