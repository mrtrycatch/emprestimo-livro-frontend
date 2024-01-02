import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteFormsComponent } from './pages/cliente-forms/cliente-forms.component';
import { LivrosComponent } from './pages/livros/livros.component';
import { LivroFormsComponent } from './pages/livro-forms/livro-forms.component';
import { EmprestimoComponent } from './pages/emprestimo/emprestimo.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioFormsComponent } from './pages/usuario-forms/usuario-forms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'cliente/create', component: ClienteFormsComponent },
  { path: 'cliente/put', component: ClienteFormsComponent },
  { path: 'livro', component: LivrosComponent },
  { path: 'livro/create', component: LivroFormsComponent },
  { path: 'emprestimo', component: EmprestimoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'usuario', component: UsuariosComponent },
  { path: 'usuario/create', component: UsuarioFormsComponent },
  { path: 'usuario/put', component: UsuarioFormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
