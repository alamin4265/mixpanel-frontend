import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { cartReducer } from './State/carts.reducer';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BeforeAppInit } from '@ngrx-addons/common';
import { providePersistStore } from '@ngrx-addons/persist-state';
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
    provideToastr(
      {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true,
      }
    ),
    provideStore(),
    provideState({ name: 'cart', reducer: cartReducer }),
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
  ]
};
