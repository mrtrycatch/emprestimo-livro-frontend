import { Component, OnInit } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { LivroService } from '../../_services/livro.service';
import { Pagination } from '../../_models/Pagination';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltroLivro } from '../../_models/FiltroLivro';

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
  isCollapsed: boolean = true;

  livroForm: FormGroup = new FormGroup({});

  constructor(
    private livroService: LivroService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selecionarLivros();
    this.initializeForm();
  }

  initializeForm() {
    this.livroForm = this.fb.group({
      nome: ['', Validators.maxLength(50)],
      autor: ['', [Validators.maxLength(200)]],
      editora: ['', [Validators.maxLength(50)]],
      anoPublicacao: [''],
      edicao: ['', [Validators.maxLength(50)]],
    });
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

  filtrar() {
    var filtroLivro: FiltroLivro = this.livroForm.value;
    filtroLivro.pageNumber = this.pageNumber;
    filtroLivro.pageSize = this.pageSize;
    this.livroService.filtrarLivro(filtroLivro).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.livros = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
}
