import { Routes } from '@angular/router';

import { ProductComponent } from './Component/product/product.component';
import { LayoutComponent } from './Component/layout/layout.component';
import { ProductDetailsComponent } from './Component/product/product-details/product-details.component';
import { AddToCartComponent } from './Component/add-to-cart/add-to-cart.component';
import { SignupLoginComponent } from './Component/signup-login/signup-login.component';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { CheckoutSuccessComponent } from './Component/checkout-success/checkout-success.component';
import { authGuard } from './Services/auth.guard';
import { loginGuard } from './Services/login.guard';
import AddProductComponent from './Component/admin/add-product/add-product.component';
// import { AddProductComponent } from './Component/product/add-product/add-product.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'signup-login',
        pathMatch:'full',
      },
    {
        path:'signup-login',
        component:SignupLoginComponent,
        canActivate: [loginGuard], 
    },
    {
        path: '',
        component: LayoutComponent, 
        children: [
            {
                path: 'products',
                component: ProductComponent,
                // pathMatch: 'full',
                canActivate: [authGuard],
            },
            {
                path: 'product-details/:id',
                component: ProductDetailsComponent,
                // pathMatch: 'full',
                canActivate: [authGuard],
            },
            // {
            //     path:'products/add',
            //     component:AddProductComponent,
            //     canActivate: [authGuard],
            // },
            {
                path:'addtocart',
                component:AddToCartComponent,
                canActivate: [authGuard],
            },
            {
                path:'checkout',
                component:CheckoutComponent,
                canActivate: [authGuard],
            },
            {
                path:'checkout-success',
                component:CheckoutSuccessComponent,
                canActivate: [authGuard],
            }
        ]
    },
    {
        path:'admin/add',
        // component:AddProductComponent,
        loadComponent:()=>import('./Component/admin/add-product/add-product.component'),
        canActivate: [authGuard],
    },
    {
        path:'lifecycle',
        // component:AddProductComponent,
        loadComponent:()=>import('./life-cycle/life-cycle.component'),
    },
    
];
