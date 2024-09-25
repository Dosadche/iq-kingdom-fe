import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/shared/models/user.model';
import { AuthRestService, JWTTokens } from '../services/rest/auth.service';
import { StorageKeys, StorageService } from '../services/storage.service';
import * as fromAuth from '../../auth/state/auth.reducer';
import * as authActions from '../../auth/state/auth.action';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  isRefreshing = false;
  private currentUser?: CurrentUser;

  constructor(
    public router: Router,
    private store: Store<fromAuth.AppState>,
    private authRESTService: AuthRestService,
    private storageService: StorageService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const user: CurrentUser = this.storageService.getItem(StorageKeys.User);
    if (user) {
      const tokenizedReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + user.accessToken,
        ),
      });
      return next.handle(tokenizedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handle401Error(request, next);
          }
          return throwError(error);
        }),
      );
    } else {
      //this.store.dispatch(new authActions.Logout());
      this.router.navigate(['auth/sign-in']);
      return next.handle(request);
    }
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const savedUser: CurrentUser = this.currentUser || this.storageService.getItem(StorageKeys.User);

      return this.authRESTService
        .refreshToken(savedUser.refreshToken)
        .pipe(
          switchMap((tokens: JWTTokens) => {
            this.isRefreshing = false;
            this.currentUser = {
              ...savedUser,
              refreshToken: tokens.refreshToken,
              accessToken: tokens.accessToken,
            };
            this.storageService.setItem(StorageKeys.User, this.currentUser);
            this.refreshTokenSubject.next(this.currentUser.accessToken);
            return next.handle(
              request.clone({
                headers: request.headers.set(
                  'Authorization',
                  `Bearer ${this.currentUser.accessToken}`,
                ),
              }),
            );
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.store.dispatch(new authActions.Logout());
            this.router.navigate(['auth/sign-in']);
            return throwError(() => err);
          })
        );
    } else {
      // If token refresh is already in progress, wait for the new token and then retry the request
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(
            request.clone({
              headers: request.headers.set('Authorization', `Bearer ${token}`),
            }),
          );
        }),
      );
    }
  }
}
