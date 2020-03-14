import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParams(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams();
    
    httpParams = httpParams.set('_page', config.pagina.toString());
    httpParams = httpParams.set('_limit', config.limite.toString());
    httpParams = httpParams.set('_sort', 'titulo');

    if (config.pesquisa)
      httpParams = httpParams.set('q', config.pesquisa);

    if (config.campo)
      httpParams = httpParams.set(config.campo.nome, config.campo.valor.toString());

    return httpParams;
  }
}
