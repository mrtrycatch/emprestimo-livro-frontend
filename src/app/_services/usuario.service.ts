import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../_models/Usuario';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = 'https://localhost:44373/api/';

  constructor(private http: HttpClient) {}

  IncluirUsuario(usuario: Usuario) {
    return this.http.post<any>(this.baseUrl + 'usuario/register', usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
