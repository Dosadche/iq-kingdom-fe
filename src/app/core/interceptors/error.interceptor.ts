import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ToasterSeverity } from 'src/app/shared/models/toaster-message.model';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toasterService: ToasterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toasterService.toaster = {
          severity: ToasterSeverity.Error,
          message: error.error.message ?? 'Something went wrong'
        };
        return throwError(() => error);
      })
    );
  }
}
