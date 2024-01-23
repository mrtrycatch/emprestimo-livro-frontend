import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LivroEmprestadoService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  SelecionarLivrosEmprestados(idEmprestimo: number) {
    return this.http
      .get<any>(this.baseUrl + 'LivroEmprestado/emprestimo/' + idEmprestimo)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
