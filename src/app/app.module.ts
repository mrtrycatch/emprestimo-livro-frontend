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
import { FormsModule } from '@angular/forms';
import { InfoClienteComponent } from './_components/info-cliente/info-cliente.component';
import { ConsultaLivrosComponent } from './_modals/consulta-livros/consulta-livros.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
