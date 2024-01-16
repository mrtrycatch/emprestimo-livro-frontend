import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return usuarioService.usuarioAtual$.pipe(
    map((user) => {
      if (user) {
        return true;
      } else {
        toastr.error('Você não tem permissão para acessar essa página.');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
