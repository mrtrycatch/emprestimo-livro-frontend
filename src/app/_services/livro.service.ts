import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Livro } from '../_models/Livro';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LivroService {
  baseUrl: string = environment.apiUrl;
  paginatedResult: PaginatedResult<Livro[]> = new PaginatedResult<Livro[]>();
  constructor(private http: HttpClient) {}

  selecionarLivros(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Livro[]>(this.baseUrl + 'livro', { observe: 'response', params })
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

  incluirLivro(livro: Livro) {
    return this.http.post<any>(this.baseUrl + 'livro', livro).pipe(
      map((response) => {
        return response;
      })
    );
  }

  alterarLivro(livro: Livro) {
    return this.http.put<any>(this.baseUrl + 'livro', livro).pipe(
      map((response) => {
        return response;
      })
    );
  }

  excluirLivro(id: number) {
    return this.http.delete<any>(this.baseUrl + 'livro/' + id).pipe(
      map((response) => {
        return response;
      })
    );
  }

  pesquisarLivro(termo: string, page: number, itemsPerPage: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('termo', termo);
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<any>(this.baseUrl + 'livro/pesquisar', {
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
