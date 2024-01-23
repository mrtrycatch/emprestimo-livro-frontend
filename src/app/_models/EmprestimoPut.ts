export interface EmprestimoPut {
  id: number;
  idCliente: number;
  dataEntrega: string;
  entregue: boolean;
  idsLivros: number[];
}
