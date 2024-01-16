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
import { authGuard } from './_guards/auth.guard';
import { adminGuard } from './_guards/admin.guard';
import { AuthorizationMessageComponent } from './pages/authorization-message/authorization-message.component';
import { verificaLoginGuard } from './_guards/verifica-login.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cliente', component: ClientesComponent, canActivate: [authGuard] },
  {
    path: 'cliente/create',
    component: ClienteFormsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cliente/put',
    component: ClienteFormsComponent,
    canActivate: [authGuard],
  },
  { path: 'livro', component: LivrosComponent, canActivate: [authGuard] },
  {
    path: 'livro/create',
    component: LivroFormsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'emprestimo',
    component: EmprestimoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [verificaLoginGuard],
  },
  {
    path: 'usuario',
    component: UsuariosComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'usuario/create',
    component: UsuarioFormsComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: 'usuario/put',
    component: UsuarioFormsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'noauthorization',
    component: AuthorizationMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
