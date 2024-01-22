import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Livro } from '../../_models/Livro';

@Component({
  selector: 'app-consulta-livros',
  templateUrl: './consulta-livros.component.html',
  styleUrl: './consulta-livros.component.css',
})
export class ConsultaLivrosComponent implements OnInit {
  consultaLivro: string = '';
  onClose: EventEmitter<any> = new EventEmitter();
  livros: Livro[] = [
    {
      id: 1,
      livroNome: 'Pinóquio',
      livroAutor: 'Carlo Collodi',
      livroEditora: 'Editolandia',
      livroAnoPublicacao: '2024-01-06T00:00:00',
      livroEdicao: '1',
    },
    {
      id: 6,
      livroNome: 'A estratégia do oceano azul',
      livroAutor: 'Renée Mauborgne',
      livroEditora: 'Actual',
      livroAnoPublicacao: '2006-01-01T00:00:00',
      livroEdicao: '1',
    },
    {
      id: 7,
      livroNome: 'Os segredos da mente milionária',
      livroAutor: 'T. Harv Eker',
      livroEditora: 'Sextante',
      livroAnoPublicacao: '2009-01-01T00:00:00',
      livroEdicao: '1',
    },
  ];

  ngOnInit(): void {
    console.log(this.consultaLivro);
  }

  constructor(private bsModalRef: BsModalRef) {}

  fecharModal() {
    this.bsModalRef.hide();
  }

  adicionarLivro(livro: Livro) {
    this.onClose.emit(livro);
    this.fecharModal();
  }
}
