import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../_services/usuario.service';

@Component({
  selector: 'app-usuario-forms',
  templateUrl: './usuario-forms.component.html',
  styleUrl: './usuario-forms.component.css',
})
export class UsuarioFormsComponent implements OnInit {
  usuario?: Usuario;
  usuarioForms: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.usuario = currentNavigation.extras.state['usuario'];
    }
  }

  ngOnInit(): void {
    this, this.initializeForm();
    if (this.usuario) {
      this.usuario.password = '';
      this.usuarioForms.setValue(this.usuario);
    }
  }

  initializeForm() {
    this.usuarioForms = this.fb.group({
      id: [0, [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(250), Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      isAdmin: [false],
    });
  }

  incluirUsuario() {
    this.usuarioService.IncluirUsuario(this.usuarioForms.value).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  }

  alterarUsuario() {}
}
