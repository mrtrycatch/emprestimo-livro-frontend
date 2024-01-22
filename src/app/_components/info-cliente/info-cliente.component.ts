import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../_models/Cliente';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrl: './info-cliente.component.css',
})
export class InfoClienteComponent {
  @Input() cliente?: Cliente;
  @Input() exibeLixeira: boolean = false;
  @Input() exibeAdd: boolean = false;
  @Output() clickButton = new EventEmitter<void>();

  addOrRemove() {
    this.clickButton.emit();
  }
}
