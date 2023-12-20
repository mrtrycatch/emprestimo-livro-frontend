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
  clientes: Cliente[] = [
    {
      Id: 1,
      CliCPF: '12345678901',
      CliNome: 'Nome do Cliente',
      CliEndereco: 'Endereço do Cliente',
      CliCidade: 'Cidade do Cliente',
      CliBairro: 'Bairro do Cliente',
      CliNumero: '123',
      CliTelefoneCelular: '11987654321',
      CliTelefoneFixo: '1134567890',
    },
    {
      Id: 1,
      CliCPF: '12345678901',
      CliNome: 'Nome do Cliente',
      CliEndereco: 'Endereço do Cliente',
      CliCidade: 'Cidade do Cliente',
      CliBairro: 'Bairro do Cliente',
      CliNumero: '123',
      CliTelefoneCelular: '11987654321',
      CliTelefoneFixo: '1134567890',
    },
    {
      Id: 1,
      CliCPF: '12345678901',
      CliNome: 'Nome do Cliente',
      CliEndereco: 'Endereço do Cliente',
      CliCidade: 'Cidade do Cliente',
      CliBairro: 'Bairro do Cliente',
      CliNumero: '123',
      CliTelefoneCelular: '11987654321',
      CliTelefoneFixo: '1134567890',
    },
  ];

  ngOnInit(): void {
    console.log(this.consultaCliente);
  }

  constructor(private bsModalRef: BsModalRef) {}

  fecharModal() {
    this.bsModalRef.hide();
  }
}
