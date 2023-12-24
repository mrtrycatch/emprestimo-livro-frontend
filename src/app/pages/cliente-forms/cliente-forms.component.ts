import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-forms',
  templateUrl: './cliente-forms.component.html',
  styleUrl: './cliente-forms.component.css',
})
export class ClienteFormsComponent implements OnInit {
  cliente?: Cliente;
  clienteForms: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.cliente = currentNavigation.extras.state['cliente'];
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.cliente) {
      this.clienteForms.setValue(this.cliente);
    }
  }

  initializeForm() {
    this.clienteForms = this.fb.group({
      Id: [0, [Validators.required, Validators.minLength(0)]],
      CliCPF: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      CliNome: ['', [Validators.required, Validators.maxLength(200)]],
      CliEndereco: ['', [Validators.required, Validators.maxLength(50)]],
      CliCidade: ['', [Validators.required, Validators.maxLength(50)]],
      CliBairro: ['', [Validators.required, Validators.maxLength(50)]],
      CliNumero: ['', [Validators.required, Validators.maxLength(50)]],
      CliTelefoneCelular: ['', [Validators.required, Validators.maxLength(11)]],
      CliTelefoneFixo: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
}
