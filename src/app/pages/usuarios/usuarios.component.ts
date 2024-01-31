import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { Router } from '@angular/router';
import { Pagination } from '../../_models/Pagination';
import { UsuarioService } from '../../_services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltroUsuario } from '../../_models/FiltroUsuario';

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

  usuarioForms: FormGroup = new FormGroup({});
  isCollapsed: boolean = true;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selecionarUsuarios();
    this.initializeForm();
  }

  initializeForm() {
    this.usuarioForms = this.fb.group({
      nome: ['', [Validators.maxLength(250)]],
      email: ['', [Validators.maxLength(250), Validators.email]],
      isAdmin: [false],
      isNotAdmin: [false],
      ativo: [false],
      inativo: [false],
    });
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

  filtrar() {
    var filtroUsuario: FiltroUsuario = this.usuarioForms.value;
    filtroUsuario.pageNumber = this.pageNumber;
    filtroUsuario.pageSize = this.pageSize;
    this.usuarioService.filtrarUsuarios(filtroUsuario).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.usuarios = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
}
