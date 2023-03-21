import { Component, Inject } from '@angular/core';
import { Color, Estado, Modelo, Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleMuebleService } from '../detalle-mueble.service';
import { ColoresApiService } from 'src/app/services/api/colores-api.service';
import { ModelosApiService } from 'src/app/services/api/modelos-api.service';
import { EstadosApiService } from 'src/app/services/api/estados-api.service';

@Component({
  selector: 'app-detalle-mueble-modal',
  templateUrl: './detalle-mueble-modal.component.html',
  styleUrls: ['./detalle-mueble-modal.component.css']
})
export class DetalleMuebleModalComponent {
  mueble:Mueble;
  modelos:Modelo[];
  colores:Color[];
  estados:Estado[];
  
  //** Esto lo voy a usar para el afterClosed
  modalRef:MatDialogRef<DetalleMuebleModalComponent>;
  

  //** Para traer datos del back **/

  getModelos():void {
    this.modelosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("dataModelos: \n", data);
        this.modelos = data;
      },
      error: (err) => {
        console.log("error trayendo modelos del servidor \n", err)
      }})        
  }

  getColores():void {
    this.coloresAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("dataColores: \n", data);
        this.colores = data;
      },
      error: (err) => {
        console.log("error trayendo colores del servidor \n", err)
      }})        
  }

  getEstados():void {
    this.estadosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("dataEstados: \n", data);
        this.estados = data;
      },
      error: (err) => {
        console.log("error trayendo estados del servidor \n", err)
      }})        
  }

  //** Constructor & ngOnInit **/

  constructor(
    private modelosAPI:ModelosApiService,
    private coloresAPI:ColoresApiService,
    private estadosAPI:EstadosApiService,
    private detalleMuebleService:DetalleMuebleService,
    modalRef:MatDialogRef<DetalleMuebleModalComponent>,
    @Inject(MAT_DIALOG_DATA) mueble: Mueble
  ) {
    this.mueble = mueble;
    this.modalRef = modalRef;
    this.detalleMuebleService.modalRef = this.modalRef;
  
    // console.log("cliente en modal: \n", cliente)
  }


  ngOnInit(): void {
    this.getModelos();
    this.getColores();
    this.getEstados();
  }
  
}
