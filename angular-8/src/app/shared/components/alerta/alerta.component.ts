import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit{

  alerta = {
    titulo: 'Sucesso!',
    descricao: 'Seu registro foi salvo!',
    btnSucesso: 'Ok',
    btnCancelar: 'Cancelar',
    corBtnSucesso: 'primary',
    corBtnCancelar: 'warn',
    possuiBtnFechar: false
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta) {}

  ngOnInit(): void{
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.corBtnSucesso = this.data.corBtnSucesso || this.alerta.corBtnSucesso;
      this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
      this.alerta.possuiBtnFechar = this.data.possuiBtnFechar || this.alerta.possuiBtnFechar;
    }
  }
}
