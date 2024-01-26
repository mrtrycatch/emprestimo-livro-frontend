export interface FiltroEmprestimo {
  cpf: string;
  nome: string;
  dataEmprestimoInicio: string;
  dataEmprestimoFim: string;
  dataEntregaInicio: string;
  dataEntregaFim: string;
  entregue: boolean;
  naoEntregue: boolean;
  pageNumber: number;
  pageSize: number;
}
