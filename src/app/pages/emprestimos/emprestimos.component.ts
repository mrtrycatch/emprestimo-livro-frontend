import { Component, OnInit } from '@angular/core';
import { EmprestimoGet } from '../../_models/EmprestimoGet';
import { EmprestimoService } from '../../_services/emprestimo.service';
import { Pagination } from '../../_models/Pagination';
import { Router } from '@angular/router';
import { TextFormatter } from '../../_helpers/TextFormatter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltroEmprestimo } from '../../_models/FiltroEmprestimo';

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
  isCollapsed: boolean = true;

  emprestimoForm: FormGroup = new FormGroup({});

  constructor(
    private emprestimoService: EmprestimoService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.selecionarEmprestimos();
    this.initializeForm();
  }

  initializeForm() {
    this.emprestimoForm = this.fb.group({
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      nome: ['', Validators.maxLength(250)],
      dataEmprestimoInicio: [''],
      dataEmprestimoFim: [''],
      dataEntregaInicio: [''],
      dataEntregaFim: [''],
      entregue: [false],
      naoEntregue: [false],
    });
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

  filtrar() {
    var filtroEmprestimo: FiltroEmprestimo = this.emprestimoForm.value;
    filtroEmprestimo.pageNumber = this.pageNumber;
    filtroEmprestimo.pageSize = this.pageSize;
    console.log(filtroEmprestimo);
    this.emprestimoService.filtrarEmprestimos(filtroEmprestimo).subscribe({
      next: (response) => {
        if (response.result && response.pagination) {
          this.emprestimos = response.result;
          this.pagination = response.pagination;
        }
      },
    });
  }
}
