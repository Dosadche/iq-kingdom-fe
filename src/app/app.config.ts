import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app-routes.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { authReducer } from './auth/state/auth.reducer';
import { AuthEffect } from './auth/state/auth.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
      StoreModule.forFeature('auth', authReducer),
      EffectsModule.forFeature(AuthEffect),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot()
    ),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
