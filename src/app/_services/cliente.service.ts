import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { Cliente } from '../_models/Cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { FiltroCliente } from '../_models/FiltroCliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  baseUrl: string = environment.apiUrl;
  paginatedResult: PaginatedResult<Cliente[]> = new PaginatedResult<
    Cliente[]
  >();
  constructor(private http: HttpClient) {}

  selecionarclientes(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Cliente[]>(this.baseUrl + 'cliente', { observe: 'response', params })
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

  incluirCliente(cliente: Cliente) {
    return this.http.post<any>(this.baseUrl + 'cliente', cliente).pipe(
      map((response) => {
        return response;
      })
    );
  }

  selecionarCliente(id: number) {
    return this.http.get<any>(this.baseUrl + 'cliente/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  alterarCliente(cliente: Cliente) {
    return this.http.put<any>(this.baseUrl + 'cliente', cliente).pipe(
      map((response) => {
        return response;
      })
    );
  }

  excluirCliente(id: number) {
    return this.http.delete<any>(this.baseUrl + 'cliente/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  pesquisarCliente(termo: string, page: number, itemsPerPage: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('termo', termo);
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<any>(this.baseUrl + 'cliente/pesquisar', {
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

  filtrarCliente(filtroCliente: FiltroCliente) {
    let params = new HttpParams();
    if (filtroCliente.pageNumber && filtroCliente.pageSize) {
      params = params.append('cpf', filtroCliente.cpf);
      params = params.append('nome', filtroCliente.nome);
      params = params.append('cidade', filtroCliente.cidade);
      params = params.append('bairro', filtroCliente.bairro);
      params = params.append('telefoneCelular', filtroCliente.telefoneCelular);
      params = params.append('telefoneFixo', filtroCliente.telefoneFixo);
      params = params.append('pageNumber', filtroCliente.pageNumber);
      params = params.append('pageSize', filtroCliente.pageSize);
    }
    return this.http
      .get<any>(this.baseUrl + 'cliente/filtrar', {
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
