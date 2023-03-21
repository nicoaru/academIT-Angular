import { Component, Input, OnInit } from '@angular/core';
import { Color, Estado, Modelo, Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import { getISODateStringFromUnixTime, getUnixTimeFromString } from 'src/app/utils/utils';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { ModelosApiService } from 'src/app/services/api/modelos-api.service';
import { ColoresApiService } from 'src/app/services/api/colores-api.service';

@Component({
  selector: 'app-detalle-mueble-item-datos',
  templateUrl: './detalle-mueble-item-datos.component.html',
  styleUrls: ['./detalle-mueble-item-datos.component.css']
})
export class DetalleMuebleItemDatosComponent {
  @Input() mueble:Mueble;
  @Input() modelos:Modelo[];
  @Input() colores:Color[];
  @Input() estados:Estado[];


  editable:boolean = false;
  formDatosMueble:FormGroup;

  toggleEdit():void {
    this.formDatosMueble.enabled
      ? this.formDatosMueble.disable()
      : this.formDatosMueble.enable();
  }


  saveChanges():void {
    let updatedMueble:Mueble = {...this.mueble}

    updatedMueble.largo = this.formDatosMueble.controls['largo'].value;
    updatedMueble.alto = this.formDatosMueble.controls['alto'].value;
    updatedMueble.profundidad = this.formDatosMueble.controls['profundidad'].value;
    updatedMueble.cantidad = this.formDatosMueble.controls['cantidad'].value;
    updatedMueble.color = {id: this.formDatosMueble.controls['color'].value};
    updatedMueble.modelo = {id: this.formDatosMueble.controls['modelo'].value};
    updatedMueble.estado = {id: this.formDatosMueble.controls['estado'].value};
    updatedMueble.notas = this.formDatosMueble.controls['notas'].value;

    console.log("Pedido que se va a guardar: ", updatedMueble)

    this.mueblesAPI.updateById(this.mueble.id, updatedMueble)
    .subscribe({
        next: (data) => {
          console.log("Mueble actualizado: ", data);
          this.mueble = updatedMueble;
        },
        error: (err) => {
          console.log("err \n", err)
          this.restoreFormValues();

          let errorMessage:string;
          err.status === 0
            ? errorMessage = "Hubo un error, no pudimos actualizar los datos del mueble"
            : err.status === 401
              ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
              : errorMessage = "Hubo un error con el servidor, no pudimos actualizar los datos del mueble"

          this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})

        }})    
    
    this.toggleEdit();   

  }

  cancelChanges():void {
    this.restoreFormValues();
    this.toggleEdit();
  }




  restoreFormValues():void {
    this.formDatosMueble.controls['largo'].setValue(this.mueble.largo);
    this.formDatosMueble.controls['alto'].setValue(this.mueble.alto);
    this.formDatosMueble.controls['profundidad'].setValue(this.mueble.profundidad);
    this.formDatosMueble.controls['cantidad'].setValue(this.mueble.cantidad);
    this.formDatosMueble.controls['color'].setValue(this.mueble.color?.id);
    this.formDatosMueble.controls['modelo'].setValue(this.mueble.modelo?.id);
    this.formDatosMueble.controls['notas'].setValue(this.mueble.notas);
    this.formDatosMueble.controls['estado'].setValue(this.mueble.estado?.id);
  }

//** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private mueblesAPI:MueblesApiService
  ) {
    //* creo el form
    this.formDatosMueble = this.formBuilder.group({
      largo: [''],
      alto: [''],
      profundidad: [''],
      cantidad: [''],
      color: [''],
      modelo: [''],
      notas: [''],
      estado: ['']
    })
    //* set disable
    this.formDatosMueble.disable();
  }



//** ngOnInit **/
  ngOnInit(): void {
    this.restoreFormValues();

    console.log("mueble:\n", this.mueble)
    console.warn("Form:\n", this.formDatosMueble)  
  }


}