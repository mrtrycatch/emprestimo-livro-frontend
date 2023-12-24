import { Component } from '@angular/core';
import { Cliente } from '../../_models/Cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
  constructor(private router: Router) {}

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

  alterarOuExcluirCliente(cliente: Cliente) {
    this.router.navigate(['cliente/put'], { state: { cliente } });
  }
}
