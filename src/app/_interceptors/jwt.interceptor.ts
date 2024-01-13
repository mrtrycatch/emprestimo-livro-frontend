import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { UsuarioService } from '../_services/usuario.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private usuarioService: UsuarioService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.usuarioService.usuarioAtual$.pipe(take(1)).subscribe({
      next: (userToken) => {
        if (userToken) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${userToken.token}`,
            },
          });
        }
      },
    });
    return next.handle(req);
  }
}
