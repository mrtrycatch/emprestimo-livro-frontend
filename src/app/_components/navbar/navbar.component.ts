import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../_services/usuario.service';
import { Router } from '@angular/router';
import { UserToken } from '../../_models/UserToken';
import { Usuario } from '../../_models/Usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userToken: UserToken | null = null;
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  ngOnInit(): void {
    this.selecionarUsuario();
  }

  selecionarUsuario() {
    this.usuarioService.usuarioAtual$.subscribe({
      next: (user) => {
        this.userToken = user;
      },
    });
  }

  alterarUsuario() {
    this.usuarioService.selecionarUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.router.navigate(['usuario/put'], { state: { usuario } });
      },
    });
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['/login']);
  }
}
