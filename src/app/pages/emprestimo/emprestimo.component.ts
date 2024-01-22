import { Component } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConsultaClientesComponent } from '../../_modals/consulta-clientes/consulta-clientes.component';
import { Cliente } from '../../_models/Cliente';
import { ConsultaLivrosComponent } from '../../_modals/consulta-livros/consulta-livros.component';
import { ClienteService } from '../../_services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Emprestimo } from '../../_models/Emprestimo';
import { EmprestimoService } from '../../_services/emprestimo.service';

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
  dataEntrega?: string;

  constructor(
    private modalService: BsModalService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private emprestimoService: EmprestimoService
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
      var existeLivroNaLista = this.livros.some((x) => x.id === result.id);
      if (existeLivroNaLista) {
        this.toastr.error('Você já incluiu esse livro no empréstimo.');
      } else {
        this.livros.push(result);
      }
    });
  }

  removerCliente() {
    this.cliente = undefined;
  }

  removerLivro(idLivro: number) {
    this.livros = this.livros.filter((x) => x.id !== idLivro);
  }

  adicionarEmprestimo() {
    var emprestimo: Emprestimo = {
      idCliente: this.cliente?.id!,
      idsLivros: this.livros.map((x) => x.id),
      dataEntrega: this.dataEntrega!,
    };

    this.emprestimoService.incluirEmprestimo(emprestimo).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.livros = [];
        this.dataEntrega = undefined;
        this.cliente = undefined;
      },
    });
  }
}
