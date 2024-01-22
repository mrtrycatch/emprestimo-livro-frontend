import { Component } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConsultaClientesComponent } from '../../_modals/consulta-clientes/consulta-clientes.component';
import { Cliente } from '../../_models/Cliente';
import { ConsultaLivrosComponent } from '../../_modals/consulta-livros/consulta-livros.component';
import { ClienteService } from '../../_services/cliente.service';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.css',
})
export class EmprestimoComponent {
  livros: Livro[] = [];

  bsModalRef?: BsModalRef;
  consultaCliente: string = '';
  consultaLivro: string = '';

  cliente?: Cliente;

  constructor(
    private modalService: BsModalService,
    private clienteService: ClienteService
  ) {}

  abrirConsultaCliente() {
    const initialState = {
      consultaCliente: this.consultaCliente,
    };
    this.bsModalRef = this.modalService.show(ConsultaClientesComponent, {
      initialState,
    });

    this.bsModalRef?.content.onClose.subscribe((result: Cliente) => {
      this.cliente = result;
    });
  }

  abrirConsultaLivro() {
    const initialState = {
      consultaLivro: this.consultaLivro,
    };
    this.bsModalRef = this.modalService.show(ConsultaLivrosComponent, {
      initialState,
    });

    this.bsModalRef?.content.onClose.subscribe((result: Livro) => {
      this.livros.push(result);
    });
  }

  removerCliente() {
    this.cliente = undefined;
  }
}
