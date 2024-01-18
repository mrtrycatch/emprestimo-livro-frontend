import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { Router } from '@angular/router';
import { Pagination } from '../../_models/Pagination';
import { UsuarioService } from '../../_services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  pagination: Pagination | undefined;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.selecionarUsuarios();
  }

  selecionarUsuarios() {
    this.usuarioService
      .selecionarUsuarios(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.usuarios = response.result;
            this.pagination = response.pagination;
          }
        },
      });
  }

  alterarUsuario(usuario: Usuario) {
    this.router.navigate(['usuario/put'], { state: { usuario } });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.selecionarUsuarios();
    }
  }
}
