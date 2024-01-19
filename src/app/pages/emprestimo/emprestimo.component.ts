import { Component } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConsultaClientesComponent } from '../../_modals/consulta-clientes/consulta-clientes.component';
import { Cliente } from '../../_models/Cliente';
import { ConsultaLivrosComponent } from '../../_modals/consulta-livros/consulta-livros.component';

@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrl: './emprestimo.component.css',
})
export class EmprestimoComponent {
  livros: Livro[] = [
    {
      id: 1,
      livroAnoPublicacao: new Date(2023, 5, 1),
      livroAutor: 'Vinicius',
      livroEdicao: '1',
      livroEditora: 'Editora',
      livroNome: 'Pinóquio',
    },
    {
      id: 1,
      livroAnoPublicacao: new Date(2022, 5, 1),
      livroAutor: 'João',
      livroEdicao: '2',
      livroEditora: 'Editora',
      livroNome: 'Lobo Mau',
    },
    {
      id: 1,
      livroAnoPublicacao: new Date(2022, 5, 1),
      livroAutor: 'João',
      livroEdicao: '2',
      livroEditora: 'Editora',
      livroNome: 'Lobo Mau',
    },
  ];

  bsModalRef?: BsModalRef;
  consultaCliente: string = '';
  consultaLivro: string = '';

  cliente: Cliente = {
    Id: 1,
    cliCPF: '12345678901',
    cliNome: 'Nome do Cliente',
    cliEndereco: 'Endereço do Cliente',
    cliCidade: 'Cidade do Cliente',
    cliBairro: 'Bairro do Cliente',
    cliNumero: '123',
    cliTelefoneCelular: '11987654321',
    cliTelefoneFixo: '1134567890',
  };

  constructor(private modalService: BsModalService) {}

  abrirConsultaCliente() {
    const initialState = {
      consultaCliente: this.consultaCliente,
    };
    this.modalService.show(ConsultaClientesComponent, {
      initialState,
    });
  }

  abrirConsultaLivro() {
    const initialState = {
      consultaLivro: this.consultaLivro,
    };
    this.modalService.show(ConsultaLivrosComponent, {
      initialState,
    });
  }
}
