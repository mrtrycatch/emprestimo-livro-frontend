import { Component, OnInit } from '@angular/core';
import { SistemaService } from '../../_services/sistema.service';
import { Sistema } from '../../_models/Sistema';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  sistema?: Sistema;
  ngOnInit(): void {
    this.selecionarSistemaInfo();
  }

  constructor(private sistemaService: SistemaService) {}

  selecionarSistemaInfo() {
    this.sistemaService.selecionarSistemaInfo().subscribe({
      next: (response) => {
        this.sistema = response;
      },
    });
  }
}
