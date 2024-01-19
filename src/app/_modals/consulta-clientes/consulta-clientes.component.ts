import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css',
})
export class ConsultaClientesComponent implements OnInit {
  consultaCliente: string = '';
  clientes: Cliente[] = [];

  ngOnInit(): void {
    console.log(this.consultaCliente);
  }

  constructor(private bsModalRef: BsModalRef) {}

  fecharModal() {
    this.bsModalRef.hide();
  }
}
