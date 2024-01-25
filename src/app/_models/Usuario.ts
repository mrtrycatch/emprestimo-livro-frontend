export interface Usuario {
  id: number;
  nome: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  ativo: boolean;
}
