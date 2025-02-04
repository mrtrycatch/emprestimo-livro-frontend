import { Component, OnInit } from '@angular/core';
import { Livro } from '../../_models/Livro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../_services/livro.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-livro-forms',
  templateUrl: './livro-forms.component.html',
  styleUrl: './livro-forms.component.css',
})
export class LivroFormsComponent implements OnInit {
  livro?: Livro;
  livroForm: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private livroService: LivroService,
    private toastr: ToastrService
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation?.extras.state) {
      this.livro = currentNavigation.extras.state['livro'];
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.livro) {
      this.livroForm.setValue(this.livro);
      let livroAnoPublicacao = this.livro.livroAnoPublicacao
        .toString()
        .split('T')[0];
      this.livroForm.controls['livroAnoPublicacao'].setValue(
        livroAnoPublicacao
      );
    }
  }

  initializeForm() {
    this.livroForm = this.fb.group({
      id: [0, [Validators.required]],
      livroNome: ['', [Validators.required, Validators.maxLength(50)]],
      livroAutor: ['', [Validators.required, Validators.maxLength(200)]],
      livroEditora: ['', [Validators.required, Validators.maxLength(50)]],
      livroAnoPublicacao: ['', Validators.required],
      livroEdicao: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  incluirLivro() {
    if (this.livroForm.valid) {
      this.livroService.incluirLivro(this.livroForm.value).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
        },
      });
    }
  }

  alterarLivro() {
    if (this.livroForm.valid) {
      this.livroService.alterarLivro(this.livroForm.value).subscribe({
        next: (response) => {
          this.toastr.success(response.message);
        },
      });
    }
  }

  ExcluirLivro() {
    Swal.fire({
      title: 'Excluir Livro',
      text: 'Deseja realmente excluir esse livro?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Sim',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.livro) {
          this.livroService.excluirLivro(this.livro.id).subscribe({
            next: (response) => {
              this.toastr.success(response.message);
              this.router.navigateByUrl('livro');
            },
          });
        }
      }
    });
  }
}
