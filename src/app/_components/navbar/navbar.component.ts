import { Component } from '@angular/core';
import { UsuarioService } from '../../_services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private usuarioService: UsuarioService) {}
  logout() {
    this.usuarioService.logout();
  }
}
