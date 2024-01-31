import { Component, OnInit } from '@angular/core';
import { UserToken } from './_models/UserToken';
import { UsuarioService } from './_services/usuario.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'emprestimo-livro-frontend';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.setUsuarioAtual();
    console.log(environment.apiUrl);
  }

  setUsuarioAtual() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const userToken: UserToken = JSON.parse(userString);
    this.usuarioService.setUsuarioAtual(userToken);
  }
}
