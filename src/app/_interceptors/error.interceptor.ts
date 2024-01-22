import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                    this.toastr.error(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof error.error === 'object') {
                this.toastr.error(error.statusText, error.status);
              } else {
                this.toastr.error(
                  error.error === null ? 'Bad Request' : error.error,
                  error.status
                );
              }
              break;
            case 401:
              this.toastr.error(
                error.error === null ? 'Não autorizado' : error.error,
                error.status
              );
              break;
            case 404:
              this.router.navigateByUrl('/');
              break;
            case 500:
              this.toastr.error('Ocorreu um erro interno');
              break;
            default:
              this.toastr.error('Ocorreu um erro inesperado');
              break;
          }
        }

        return throwError(error);
      })
    );
  }
}
