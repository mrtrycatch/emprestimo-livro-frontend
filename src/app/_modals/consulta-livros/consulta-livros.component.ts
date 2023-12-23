import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Livro } from '../../_models/Livro';

@Component({
  selector: 'app-consulta-livros',
  templateUrl: './consulta-livros.component.html',
  styleUrl: './consulta-livros.component.css',
})
export class ConsultaLivrosComponent implements OnInit {
  consultaLivro: string = '';
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

  ngOnInit(): void {
    console.log(this.consultaLivro);
  }

  constructor(private bsModalRef: BsModalRef) {}

  fecharModal() {
    this.bsModalRef.hide();
  }
}
