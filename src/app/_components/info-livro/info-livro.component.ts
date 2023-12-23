import { Component, Input } from '@angular/core';
import { Livro } from '../../_models/Livro';

@Component({
  selector: 'app-info-livro',
  templateUrl: './info-livro.component.html',
  styleUrl: './info-livro.component.css',
})
export class InfoLivroComponent {
  @Input() livro?: Livro;
  @Input() exibeLixeira: boolean = false;
  @Input() exibeAdd: boolean = false;
}
