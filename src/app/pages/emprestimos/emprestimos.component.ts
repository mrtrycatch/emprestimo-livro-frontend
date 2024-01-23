import { Component, OnInit } from '@angular/core';
import { EmprestimoGet } from '../../_models/EmprestimoGet';
import { EmprestimoService } from '../../_services/emprestimo.service';
import { Pagination } from '../../_models/Pagination';
import { Router } from '@angular/router';
import { TextFormatter } from '../../_helpers/TextFormatter';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrl: './emprestimos.component.css',
})
export class EmprestimosComponent implements OnInit {
  emprestimos: EmprestimoGet[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  pagination: Pagination | undefined;
  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.selecionarEmprestimos();
  }

  selecionarEmprestimos() {
    this.emprestimoService
      .selecionarEmprestimos(this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.emprestimos = response.result;
            this.pagination = response.pagination;
          }
        },
      });
  }

  alterarEmprestimo(emprestimo: EmprestimoGet) {
    this.router.navigate(['emprestimo'], { state: { emprestimo } });
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.selecionarEmprestimos();
    }
  }

  dataFormatter(data: string) {
    return TextFormatter.formatDate(data);
  }

  cpfFormatter(cpf: string) {
    return TextFormatter.formatCPF(cpf);
  }
}
