// import { Routes } from '@angular/router';
// import { authGuard } from '../Services/auth.guard';
// const componentRoutes: Routes = [
//     {
//         path: '',
//         loadComponent: ()=>import('./layout/layout.component'), 
//         children: [
//             {
//                 path: 'products',
//                 loadComponent: ()=>import('./product/product.component'),
//                 // pathMatch: 'full',
//                 canActivate: [authGuard],
//             },
//             {
//                 path: 'product-details/:id',
//                 loadComponent: ()=>import('./product/product-details/product-details.component'),
//                 // pathMatch: 'full',
//                 canActivate: [authGuard],
//             },
//             {
//                 path:'addtocart',
//                 loadComponent:()=>import('./add-to-cart/add-to-cart.component'),
//                 canActivate: [authGuard],
//             },
//             {
//                 path:'checkout',
//                 loadComponent:()=>import('./checkout/checkout.component'),
//                 canActivate: [authGuard],
//             },
//             {
//                 path:'checkout-success',
//                 loadComponent:()=>import('./checkout-success/checkout-success.component'),
//                 canActivate: [authGuard],
//             },
//             {
//                 path:'admin/add',
//                 loadComponent: ()=>import('./admin/add-product/add-product.component'),
//             }
//         ]
//     }
// ];

// export default componentRoutes;