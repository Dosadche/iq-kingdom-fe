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
import { routes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { authReducer } from './auth/state/auth.reducer';
import { AuthEffect } from './auth/state/auth.effect';
import { UserEffect } from './dashboard/state/users/user.effect';
import { usersReducer } from './dashboard/state/users/user.reducer';
import { notificationReducer } from './dashboard/state/notifications/notification.reducer';
import { NotificationEffect } from './dashboard/state/notifications/notification,effect';
import { fightsReducer } from './dashboard/state/fights/fight.reducer';
import { FightEffect } from './dashboard/state/fights/fight.effect';
import { questionReducer } from './dashboard/state/questions/question.reducer';
import { QuestionEffect } from './dashboard/state/questions/question.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({}),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
      StoreModule.forFeature('auth', authReducer),
      EffectsModule.forFeature(AuthEffect),
      StoreModule.forFeature('users', usersReducer),
      EffectsModule.forFeature(UserEffect),
      StoreModule.forFeature('notifications', notificationReducer),
      EffectsModule.forFeature(NotificationEffect),
      StoreModule.forFeature('fights', fightsReducer),
      EffectsModule.forFeature(FightEffect),
      StoreModule.forFeature('questions', questionReducer),
      EffectsModule.forFeature(QuestionEffect),
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
