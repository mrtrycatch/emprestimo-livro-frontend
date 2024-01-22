import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css',
})
export class ConsultaClientesComponent implements OnInit {
  consultaCliente: string = '';
  onClose: EventEmitter<any> = new EventEmitter();
  clientes: Cliente[] = [
    {
      id: 1,
      cliCPF: '11111111111',
      cliNome: 'Maria',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: '111',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 2,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 3,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 4,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 5,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 6,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 7,
      cliCPF: '11111111111',
      cliNome: 'Vinicius',
      cliEndereco: 'teste',
      cliCidade: 'teste',
      cliBairro: 'teste',
      cliNumero: 'teste',
      cliTelefoneCelular: '1111111111',
      cliTelefoneFixo: '1111111111',
    },
    {
      id: 1002,
      cliCPF: '11122222222',
      cliNome: 'João',
      cliEndereco: 'Rua testando',
      cliCidade: 'São Paulo',
      cliBairro: 'Bairro teste',
      cliNumero: '123',
      cliTelefoneCelular: '11999999999',
      cliTelefoneFixo: '1199999999',
    },
  ];

  ngOnInit(): void {
    console.log(this.consultaCliente);
  }

  constructor(private bsModalRef: BsModalRef) {}

  fecharModal() {
    this.bsModalRef.hide();
  }

  adicionarCliente(cliente: Cliente) {
    this.onClose.emit(cliente);

    this.fecharModal();
  }
}
