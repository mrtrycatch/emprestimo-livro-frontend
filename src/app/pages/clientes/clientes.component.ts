import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../_services/cliente.service';
import { Pagination } from '../../_models/Pagination';
import { TextFormatter } from '../../_helpers/TextFormatter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltroCliente } from '../../_models/FiltroCliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {}
  pageNumber: number = 1;
  pageSize: number = 10;
  pagination: Pagination | undefined;
  clientes: Cliente[] = [];
  isCollapsed = true;
  clienteForms: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.selecionarClientes();
    this.initializeForm();
  }

  initializeForm() {
    this.clienteForms = this.fb.group({
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      nome: ['', [Validators.maxLength(200)]],
      cidade: ['', [Validators.maxLength(50)]],
      bairro: ['', [Validators.maxLength(50)]],
      telefoneCelular: [
        '',
        [Validators.maxLength(11), Validators.minLength(11)],
      ],
      telefoneFixo: ['', [Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  alterarOuExcluirCliente(cliente: Cliente) {
    this.router.navigate(['cliente/put'], { state: { cliente } });
  }

  selecionarClientes() {
    this.clienteService
      .selecionarclientes(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.clientes = response.result;
            this.pagination = response.pagination;
          }
        },
      });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.selecionarClientes();
    }
  }

  cpfFormatter(cpf: string) {
    return TextFormatter.formatCPF(cpf);
  }

  celularFormatter(celular: string) {
    return TextFormatter.formatTelefoneCelular(celular);
  }

  filtrar() {
    var filtroCliente: FiltroCliente = this.clienteForms.value;
    filtroCliente.pageNumber = this.pageNumber;
    filtroCliente.pageSize = this.pageSize;
    this.clienteService.filtrarCliente(filtroCliente).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.clientes = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
}
