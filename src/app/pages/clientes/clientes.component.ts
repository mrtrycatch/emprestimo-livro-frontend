import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../_services/cliente.service';
import { Pagination } from '../../_models/Pagination';
import { TextFormatter } from '../../_helpers/TextFormatter';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  constructor(private router: Router, private clienteService: ClienteService) {}
  pageNumber: number = 1;
  pageSize: number = 10;
  pagination: Pagination | undefined;
  clientes: Cliente[] = [];

  ngOnInit(): void {
    this.selecionarClientes();
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
}
