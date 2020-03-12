import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  hasError(control :AbstractControl, errorName: string): boolean{
    if (!(control.touched || control.dirty))
      return false;

    return control.hasError(errorName);
  };

  validarLength(control :AbstractControl, errorName: string): number {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  };

}
