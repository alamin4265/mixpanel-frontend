import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ActionReducer, MetaReducer, provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './states/cart/reducer/cart.reducer';
import { BeforeAppInit } from '@ngrx-addons/common';
import { providePersistStore, localStorageStrategy } from '@ngrx-addons/persist-state';
import localForage from 'localforage';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productReducer } from './states/product/reducer/product.reducer';
import { ProductEffects } from './states/product/effect/product.effect';

const reducers = {
  cart: cartReducer,
} as const;

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr({ timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true, }),
    provideStore(),
    // provideStore({ cart: cartReducer }),
    provideState({ name: 'cart', reducer: cartReducer }),
    provideState({ name: 'product', reducer: productReducer }),
    // provideState({ name: 'product', reducer: productReducer }),
    provideStoreDevtools({
      maxAge: 25
    }),
    providePersistStore<typeof reducers>({
      states: [
        {
          key: 'cart',
          storage: localForage
        },
      ],
      storageKeyPrefix: 'mixpanel-frontend',
      strategy: BeforeAppInit,
    }),
    provideEffects(ProductEffects),
]
};
