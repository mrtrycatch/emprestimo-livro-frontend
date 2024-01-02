import { Component } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  constructor(private router: Router) {}

  usuarios: Usuario[] = [
    {
      id: 1,
      isAdmin: true,
      email: 'teste@teste.com',
      nome: 'Vinicius',
      password: undefined,
    },
    {
      id: 2,
      isAdmin: false,
      email: 'teste2@teste.com',
      nome: 'João',
      password: undefined,
    },
    {
      id: 3,
      isAdmin: false,
      email: 'teste3@teste.com',
      nome: 'José',
      password: undefined,
    },
  ];

  alterarUsuario(usuario: Usuario) {
    this.router.navigate(['usuario/put'], { state: { usuario } });
  }
}
