import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { UserToken } from '../../_models/UserToken';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForms();
  }
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  initializeForms() {
    this.loginForm = this.fb.group({
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
    });
  }

  fazerLogin() {
    this.usuarioService.fazerLogin(this.loginForm.value).subscribe({
      next: (response: UserToken) => {
        this.toastr.success('Login realizado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (response: any) => {
        this.toastr.error(response.error);
      },
    });
  }
}
