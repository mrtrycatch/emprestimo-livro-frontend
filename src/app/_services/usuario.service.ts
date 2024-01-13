import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../_models/Usuario';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../_models/Login';
import { UserToken } from '../_models/UserToken';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = environment.apiUrl;
  private usuarioAtualSource = new BehaviorSubject<UserToken | null>(null);
  usuarioAtual$ = this.usuarioAtualSource.asObservable();
  constructor(private http: HttpClient) {}

  IncluirUsuario(usuario: Usuario) {
    return this.http.post<any>(this.baseUrl + 'usuario/register', usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }

  fazerLogin(login: Login) {
    return this.http.post<any>(this.baseUrl + 'usuario/login', login).pipe(
      map((response: UserToken) => {
        if (response) {
          localStorage.setItem('user', JSON.stringify(response));
          this.setUsuarioAtual(response);
        }
        return response;
      })
    );
  }

  setUsuarioAtual(userToken: UserToken) {
    this.usuarioAtualSource.next(userToken);
  }

  logout() {
    this.usuarioAtualSource.next(null);
    localStorage.removeItem('user');
  }
}
