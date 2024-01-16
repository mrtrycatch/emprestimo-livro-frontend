import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../_models/Usuario';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../_models/Login';
import { UserToken } from '../_models/UserToken';
import { PaginatedResult } from '../_models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl: string = environment.apiUrl;
  private usuarioAtualSource = new BehaviorSubject<UserToken | null>(null);
  usuarioAtual$ = this.usuarioAtualSource.asObservable();
  paginatedResult: PaginatedResult<Usuario[]> = new PaginatedResult<
    Usuario[]
  >();

  constructor(private http: HttpClient) {}

  IncluirUsuario(usuario: Usuario) {
    return this.http.post<any>(this.baseUrl + 'usuario/register', usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }

  AlterarUsuario(usuario: Usuario) {
    if (!usuario.password || usuario.password.length == 0) {
      usuario.password = undefined;
    }
    console.log(usuario);
    return this.http.put<any>(this.baseUrl + 'usuario', usuario).pipe(
      map((response) => {
        return response;
      })
    );
  }

  selecionarUsuarios(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page && itemsPerPage) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http
      .get<Usuario[]>(this.baseUrl + 'usuario', { observe: 'response', params })
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

  selecionarUsuario(id?: number) {
    return this.http.get<any>(this.baseUrl + 'usuario/' + (id ? id : '0')).pipe(
      map((response: Usuario) => {
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

  isAdmin() {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const user: UserToken = JSON.parse(userStorage);
      return user.isAdmin;
    }

    return false;
  }

  setUsuarioAtual(userToken: UserToken) {
    this.usuarioAtualSource.next(userToken);
  }

  logout() {
    this.usuarioAtualSource.next(null);
    localStorage.removeItem('user');
  }
}
