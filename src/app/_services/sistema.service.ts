import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  selecionarSistemaInfo() {
    return this.http.get<any>(this.baseUrl + 'sistema/dashboard').pipe(
      map((response) => {
        return response;
      })
    );
  }
}
