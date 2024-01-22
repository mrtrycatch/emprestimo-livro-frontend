import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Emprestimo } from '../_models/Emprestimo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmprestimoService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  incluirEmprestimo(emprestimo: Emprestimo) {
    return this.http.post<any>(this.baseUrl + 'emprestimo', emprestimo).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
