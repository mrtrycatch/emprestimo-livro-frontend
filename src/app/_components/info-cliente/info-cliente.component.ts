import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { TextFormatter } from '../../_helpers/TextFormatter';

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

  cpfFormatter(cpf: string | undefined) {
    if (cpf) {
      return TextFormatter.formatCPF(cpf);
    }

    return undefined;
  }

  telefoneFixoFormatter(telefoneFixo: string | undefined) {
    if (telefoneFixo) {
      return TextFormatter.formatTelefoneFixo(telefoneFixo);
    }

    return undefined;
  }

  telefoneCelularFormatter(telefoneCelular: string | undefined) {
    if (telefoneCelular) {
      return TextFormatter.formatTelefoneCelular(telefoneCelular);
    }

    return undefined;
  }
}
