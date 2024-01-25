import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ClienteService } from '../../_services/cliente.service';
import { Pagination } from '../../_models/Pagination';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css',
})
export class ConsultaClientesComponent implements OnInit {
  consultaCliente: string = '';
  onClose: EventEmitter<any> = new EventEmitter();
  clientes: Cliente[] = [];
  page: number = 1;
  itemsPerPage: number = 10;
  pagination: Pagination | undefined;

  ngOnInit(): void {
    this.consultarClientes();
  }

  constructor(
    private bsModalRef: BsModalRef,
    private clienteService: ClienteService
  ) {}

  fecharModal() {
    this.bsModalRef.hide();
  }

  adicionarCliente(cliente: Cliente) {
    this.onClose.emit(cliente);

    this.fecharModal();
  }

  consultarClientes() {
    this.clienteService
      .pesquisarCliente(this.consultaCliente, this.page, this.itemsPerPage)
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
    if (this.page !== event.page) {
      this.page = event.page;
      this.consultarClientes();
    }
  }
}
