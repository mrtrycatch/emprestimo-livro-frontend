import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Emprestimo } from '../_models/Emprestimo';
import { map } from 'rxjs';
import { EmprestimoGet } from '../_models/EmprestimoGet';
import { PaginatedResult } from '../_models/Pagination';
import { EmprestimoPut } from '../_models/EmprestimoPut';
import { FiltroEmprestimo } from '../_models/FiltroEmprestimo';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  baseUrl: string = environment.apiUrl;
  paginatedResult: PaginatedResult<EmprestimoGet[]> = new PaginatedResult<
    EmprestimoGet[]
  >();
  constructor(private http: HttpClient) {}

  incluirEmprestimo(emprestimo: Emprestimo) {
    return this.http.post<any>(this.baseUrl + 'emprestimo', emprestimo).pipe(
      map((response) => {
        return response;
      })
    );
  }

  alterarEmprestimo(emprestimoPut: EmprestimoPut) {
    return this.http.put<any>(this.baseUrl + 'emprestimo', emprestimoPut).pipe(
      map((response) => {
        return response;
      })
    );
  }

  selecionarEmprestimos(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<EmprestimoGet[]>(this.baseUrl + 'emprestimo', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }

          return this.paginatedResult;
        })
      );
  }

  filtrarEmprestimos(filtroEmprestimo: FiltroEmprestimo) {
    let params = new HttpParams();
    if (filtroEmprestimo.pageNumber && filtroEmprestimo.pageSize) {
      params = params.append('cpf', filtroEmprestimo.cpf);
      params = params.append('nome', filtroEmprestimo.nome);
      params = params.append(
        'dataEmprestimoInicio',
        filtroEmprestimo.dataEmprestimoInicio
      );
      params = params.append(
        'dataEmprestimoFim',
        filtroEmprestimo.dataEmprestimoFim
      );
      params = params.append(
        'dataEntregaInicio',
        filtroEmprestimo.dataEntregaInicio
      );
      params = params.append('dataEntregaFim', filtroEmprestimo.dataEntregaFim);
      params = params.append('entregue', filtroEmprestimo.entregue);
      params = params.append('naoEntregue', filtroEmprestimo.naoEntregue);
      params = params.append('pageNumber', filtroEmprestimo.pageNumber);
      params = params.append('pageSize', filtroEmprestimo.pageSize);
    }

    return this.http
      .get<any>(this.baseUrl + 'emprestimo/filtrar', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (response.body) {
            this.paginatedResult.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            this.paginatedResult.pagination = JSON.parse(pagination);
          }

          return this.paginatedResult;
        })
      );
  }
}
