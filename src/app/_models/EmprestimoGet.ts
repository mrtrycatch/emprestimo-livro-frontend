import { Cliente } from './Cliente';

export interface EmprestimoGet {
  id: number;
  idCliente: number;
  dataEmprestimo: string;
  dataEntrega: string;
  entregue: boolean;
  clienteDTO: Cliente;
}
