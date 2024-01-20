import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './_modules/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { FooterComponent } from './_components/footer/footer.component';
import { BaseUiComponent } from './_components/base-ui/base-ui.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteFormsComponent } from './pages/cliente-forms/cliente-forms.component';
import { LivrosComponent } from './pages/livros/livros.component';
import { LivroFormsComponent } from './pages/livro-forms/livro-forms.component';
import { EmprestimoComponent } from './pages/emprestimo/emprestimo.component';
import { InfoLivroComponent } from './_components/info-livro/info-livro.component';
import { ConsultaClientesComponent } from './_modals/consulta-clientes/consulta-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoClienteComponent } from './_components/info-cliente/info-cliente.component';
import { ConsultaLivrosComponent } from './_modals/consulta-livros/consulta-livros.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioFormsComponent } from './pages/usuario-forms/usuario-forms.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { AuthorizationMessageComponent } from './pages/authorization-message/authorization-message.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    BaseUiComponent,
    ClientesComponent,
    ClienteFormsComponent,
    LivrosComponent,
    LivroFormsComponent,
    EmprestimoComponent,
    InfoLivroComponent,
    ConsultaClientesComponent,
    InfoClienteComponent,
    ConsultaLivrosComponent,
    LoginComponent,
    UsuariosComponent,
    UsuarioFormsComponent,
    AuthorizationMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
