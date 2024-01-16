import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';
import { map } from 'rxjs';

export const verificaLoginGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  return usuarioService.usuarioAtual$.pipe(
    map((user) => {
      if (user) {
        router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    })
  );
};
