import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})

export class ListagemFilmesComponent implements OnInit {

  readonly limite: number = 4;
  filmes: Filme[] = [];
  pagina: number = 0;
  filtrosListagem: FormGroup;
  generos: Array<string>;
  
  texto : string = '';
  genero: string = '';


  constructor(private filmesService: FilmesService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {    
    this.filtrosListagem = this.formBuilder.group({
      texto: [''],
      genero: ['']
    });
    this.generos = ['Ação','Aventura','Fição Cientifica', 'Drama', 'Terror', 'Comédia', 'Suspense', 'Policial', 'Romance'];

    this.filtrosListagem.get('texto').valueChanges.subscribe( value => {
        this.texto = value; 
        this.resetarFilmes();
    });
    this.filtrosListagem.get('genero').valueChanges.subscribe( value => {
        this.genero = value; 
        this.resetarFilmes();
    });
    
    this.listarFilmes();
  }
  
  onScroll(): void {    
    this.listarFilmes();
  }

  private listarFilmes(): void  {
    this.filmesService.listar(++this.pagina, this.limite, this.texto, this.genero).subscribe( 
      (listaFilmes) => this.filmes.push(...listaFilmes), 
      (error) => {
        console.log('erro ao buscar listagem: '+error) }
      );
  }  

  resetarFilmes(): void {
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes()
  }

  open() {
  }

}
