import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';
import { HttpClient, HttpParams } from '@angular/common/http';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>( url, filme);
  }

  listar(page: number, qtd: number, texto: string = '', genero: string = ''): Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', page.toString());
    httpParams = httpParams.set('_limit', qtd.toString());
    httpParams = httpParams.set('_sort', 'titulo');
    if (texto)
      httpParams = httpParams.set('q', texto);
    if (genero)
      httpParams = httpParams.set('genero',genero);
    return this.http.get<Filme[]>(url, {params: httpParams} );
  }

}
