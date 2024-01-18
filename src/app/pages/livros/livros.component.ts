import { Component, OnInit } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { LivroService } from '../../_services/livro.service';
import { Pagination } from '../../_models/Pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrl: './livros.component.css',
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  pagination: Pagination | undefined;

  constructor(private livroService: LivroService, private router: Router) {}

  ngOnInit(): void {
    this.selecionarLivros();
  }

  selecionarLivros() {
    this.livroService
      .selecionarLivros(this.pageNumber, this.pageSize)
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
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.selecionarLivros();
    }
  }

  alterarLivro(livro: Livro) {
    this.router.navigate(['livro/put'], { state: { livro } });
  }
}
