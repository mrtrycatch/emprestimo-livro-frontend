import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../_services/usuario.service';
import { ToastrService } from 'ngx-toastr';

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
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.usuario = currentNavigation.extras.state['usuario'];
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.usuario) {
      this.usuario.password = '';
      this.usuarioForms.setValue(this.usuario);
    }
  }

  initializeForm() {
    const passwordValidators = [
      Validators.minLength(8),
      Validators.maxLength(100),
    ];

    if (!this.usuario) {
      passwordValidators.unshift(Validators.required);
    }

    this.usuarioForms = this.fb.group({
      id: [0, [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(250)]],
      email: [
        '',
        [Validators.required, Validators.maxLength(250), Validators.email],
      ],
      password: ['', passwordValidators],
      isAdmin: [false],
      ativo: [false],
    });
  }

  incluirUsuario() {
    if (this.usuarioForms.valid) {
      this.usuarioService.IncluirUsuario(this.usuarioForms.value).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
          this.usuarioForms.reset();
        },
      });
    }
  }

  alterarUsuario() {
    if (this.usuarioForms.valid) {
      this.usuarioService.AlterarUsuario(this.usuarioForms.value).subscribe({
        next: (response: any) => {
          this.toastr.success(response.message);
        },
      });
    }
  }
}
