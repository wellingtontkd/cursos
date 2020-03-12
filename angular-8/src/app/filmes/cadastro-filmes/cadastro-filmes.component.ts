import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  
  constructor(public validacao: ValidarCamposService,
              private fb: FormBuilder) { }

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

  salvar(): void{
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid)
      return;

    alert('Salvo com Sucesso \n\n'+JSON.stringify(this.cadastro.value, null, 4))
  }

  reiniciarForm(): void{
    this.cadastro.reset;
  }

}
