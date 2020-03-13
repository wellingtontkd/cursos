import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  pagina: number = 0;
  readonly limite: number = 4;

  constructor(private filmesService: FilmesService) { }

  ngOnInit() {    
    this.listarFilmes();
  }

  onScroll(): void {    
    this.listarFilmes();
  }

  private listarFilmes(): void  {
    this.filmesService.listar(++this.pagina, this.limite).subscribe( 
      (listaFilmes) => this.filmes.push(...listaFilmes), 
      (error) => {
        console.log('erro ao buscar listagem: '+error) }
      );
  }

  open() {
  }

}
