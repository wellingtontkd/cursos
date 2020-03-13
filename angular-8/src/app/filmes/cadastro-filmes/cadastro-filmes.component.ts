import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material/dialog';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  
  constructor(public validacao: ValidarCamposService,
              private fb: FormBuilder,
              private filmesService: FilmesService,
              private dialog: MatDialog,
              private router: Router) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dataLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['',[Validators.required]]
    });
    this.generos = ['Ação','Aventura','Fição Cientifica', 'Drama', 'Terror', 'Comédia', 'Suspense', 'Policial', 'Romance'];
  }

  submit(): void{
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid)
      return;

    const Filme = this.cadastro.getRawValue() as Filme;    
    this.salvar(Filme);
    //alert('Salvo com Sucesso \n\n'+JSON.stringify(this.cadastro.value, null, 4))
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe( () => {      
        const config = {
          disableClose: true,
          data: {            
            descricao: 'Filme foi registrado com sucesso!',
            possuiBtnFechar: true,
            btnSucesso: 'Ir para listagem',
            btnCancelar: 'Cadastrar novo',
            corBtnSucesso: 'primary',
            corBtnCancelar: 'accent'
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
    
        dialogRef.afterClosed().subscribe( (opcao: boolean) => {
          console.log(opcao);
          if (opcao) {
            this.router.navigateByUrl('filmes');
          }else{
            this.reiniciarForm();
          }
        });
    },
    () => {
        const config = {          
          data: {
            titulo: 'Erro!',
            descricao: 'Não foi possível salvar o registro',
            btnSucesso: 'Fechar',
            corBtnSucesso: 'warn'
          } as Alerta
        };
        const dialogRef = this.dialog.open(AlertaComponent, config);
    }
    );
  }

}
