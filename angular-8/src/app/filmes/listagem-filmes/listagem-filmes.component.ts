import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigParams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})

export class ListagemFilmesComponent implements OnInit {

  config: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  filmes: Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>;

  constructor(private filmesService: FilmesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.generos = ['','Ação','Aventura','Fição Cientifica', 'Drama', 'Terror', 'Comédia', 'Suspense', 'Policial', 'Romance'];
    
    this.filtrosListagem = this.formBuilder.group({
      texto: [''],
      genero: ['']
    })

    this.filtrosListagem.get('texto').valueChanges.subscribe( value => {
        this.limparFiltros().pesquisa = value;
        this.listarFilmes();
    });

    this.filtrosListagem.get('genero').valueChanges.subscribe( value => {
        this.limparFiltros().campo = 
          value === '' ? null : {nome: 'genero', valor: value};
        this.listarFilmes();
    });
    
    this.listarFilmes();
  }

  private listarFilmes(): void  {
    this.config.pagina++;    
    this.filmesService.listar(this.config).subscribe( 
      (listaFilmes) => this.filmes.push(...listaFilmes), 
      (error) => {
        console.log('erro ao buscar listagem: '+error) }
      );
  }  

  limparFiltros(): ConfigParams {
    this.config.pagina = 0;
    this.filmes = [];
    return this.config;
  }
  
  onScroll(): void {    
    this.listarFilmes();
  }

  open() {
  }

}
