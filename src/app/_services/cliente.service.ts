import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaginatedResult } from '../_models/Pagination';
import { Cliente } from '../_models/Cliente';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

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
}
