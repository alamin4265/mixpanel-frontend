import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { cartReducer } from './states/cart/reducer/cart.reducer';
import { BeforeAppInit } from '@ngrx-addons/common';
import { providePersistStore, localStorageStrategy } from '@ngrx-addons/persist-state';
import localForage from 'localforage';


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
    provideStore({ cart: cartReducer }),
    // provideStoreDevtools({
    //   maxAge: 25
    // }),
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
]
};
