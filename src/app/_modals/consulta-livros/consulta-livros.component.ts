import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Livro } from '../../_models/Livro';
import { LivroService } from '../../_services/livro.service';
import { Pagination } from '../../_models/Pagination';

@Component({
  selector: 'app-consulta-livros',
  templateUrl: './consulta-livros.component.html',
  styleUrl: './consulta-livros.component.css',
})
export class ConsultaLivrosComponent implements OnInit {
  consultaLivro: string = '';
  onClose: EventEmitter<any> = new EventEmitter();
  page: number = 1;
  itemsPerPage: number = 10;
  pagination: Pagination | undefined;
  livros: Livro[] = [];

  ngOnInit(): void {
    this.consultarLivros();
  }

  constructor(
    private bsModalRef: BsModalRef,
    private livroService: LivroService
  ) {}

  fecharModal() {
    this.bsModalRef.hide();
  }

  adicionarLivro(livro: Livro) {
    this.onClose.emit(livro);
    this.fecharModal();
  }

  consultarLivros() {
    this.livroService
      .pesquisarLivro(this.consultaLivro, this.page, this.itemsPerPage)
      .subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.livros = response.result;
            this.pagination = response.pagination;
          }
        },
      });
  }
  pageChanged(event: any) {
    if (this.page !== event.page) {
      this.page = event.page;
      this.consultarLivros();
    }
  }
}
