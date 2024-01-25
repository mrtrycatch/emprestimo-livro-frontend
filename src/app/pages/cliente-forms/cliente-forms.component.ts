import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../_services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-forms',
  templateUrl: './cliente-forms.component.html',
  styleUrl: './cliente-forms.component.css',
})
export class ClienteFormsComponent implements OnInit {
  cliente?: Cliente;
  clienteForms: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.cliente = currentNavigation.extras.state['cliente'];
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.cliente) {
      this.clienteForms.setValue(this.cliente);
      console.log(this.cliente);
    }
  }

  initializeForm() {
    this.clienteForms = this.fb.group({
      id: [0, [Validators.required, Validators.minLength(0)]],
      cliCPF: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      cliNome: ['', [Validators.required, Validators.maxLength(200)]],
      cliEndereco: ['', [Validators.required, Validators.maxLength(50)]],
      cliCidade: ['', [Validators.required, Validators.maxLength(50)]],
      cliBairro: ['', [Validators.required, Validators.maxLength(50)]],
      cliNumero: ['', [Validators.required, Validators.maxLength(50)]],
      cliTelefoneCelular: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
        ],
      ],
      cliTelefoneFixo: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
    });
  }

  alterarCliente() {
    this.clienteService.alterarCliente(this.clienteForms.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
      },
    });
  }

  incluirCliente() {
    this.clienteService.incluirCliente(this.clienteForms.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
      },
    });
  }

  ExcluirCliente() {
    Swal.fire({
      title: 'Excluir Cliente',
      text: 'Deseja realmente excluir esse cliente?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.cliente) {
          this.clienteService.excluirCliente(this.cliente.id).subscribe({
            next: (response) => {
              this.toastr.success(response.message);
              this.router.navigateByUrl('cliente');
            },
          });
        }
      }
    });
  }
}
