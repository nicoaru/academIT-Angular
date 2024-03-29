import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Color, Estado, Modelo, Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import { getISODateStringFromUnixTime, getUnixTimeFromString } from 'src/app/utils/utils';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { ModelosApiService } from 'src/app/services/api/modelos-api.service';
import { ColoresApiService } from 'src/app/services/api/colores-api.service';
import { Subscription } from 'rxjs';
import { MuebleService } from 'src/app/services/mueble.service';

@Component({
  selector: 'app-detalle-mueble-item-datos',
  templateUrl: './detalle-mueble-item-datos.component.html',
  styleUrls: ['./detalle-mueble-item-datos.component.css', '../../../styles/form-control.css']
})
export class DetalleMuebleItemDatosComponent implements OnInit, OnDestroy {
  formDatosMueble:FormGroup;  
  private subscribtionMueble$: Subscription;
  private subscribtionModelo$: Subscription;
  private subscribtionColor$: Subscription;
  private subscribtionEstado$: Subscription;
  
  mueble:Mueble;
  modelos:Modelo[];
  colores:Color[];
  estados:Estado[];

  editable:boolean = false;




  //** Constructor **/
  //** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog:MatDialog,
    private mueblesAPI:MueblesApiService,
    private muebleService:MuebleService
  ) {
    //* creo el form
    this.formDatosMueble = this.formBuilder.group({
      largo: ['', Validators.min(0)],
      alto: ['', Validators.min(0)],
      profundidad: ['', Validators.min(0)],
      cantidad: ['', Validators.min(0)],
      color: [''],
      modelo: ['', Validators.required],
      notas: [''],
      estado: ['']
    })
    //* set disable
    this.formDatosMueble.disable();

    console.log(this.formDatosMueble)
  }




  //** Métodos **//
  //** Métodos **//

  toggleEdit():void {
    this.formDatosMueble.enabled
      ? this.formDatosMueble.disable()
      : this.formDatosMueble.enable();
  }

  saveChanges():void {
    try {
      let updatedMueble:Mueble = {...this.mueble}

      updatedMueble.largo = this.formDatosMueble.controls['largo'].value;
      updatedMueble.alto = this.formDatosMueble.controls['alto'].value;
      updatedMueble.profundidad = this.formDatosMueble.controls['profundidad'].value;
      updatedMueble.cantidad = this.formDatosMueble.controls['cantidad'].value;
      updatedMueble.color = {id: this.formDatosMueble.controls['color'].value};
      updatedMueble.modelo = {id: this.formDatosMueble.controls['modelo'].value};
      updatedMueble.estado = {id: this.formDatosMueble.controls['estado'].value};
      updatedMueble.notas = this.formDatosMueble.controls['notas'].value;

      console.log("Mueble que se va a actualizar: ", updatedMueble)

      this.mueblesAPI.updateById(this.mueble.id, updatedMueble)
      .subscribe({
          next: (data) => {
            console.log("mueble actualizado: ", data);
            this.muebleService.getMuebles();
            let message = `Mueble modificado con éxito`
            this.matDialog.open(AlertModalComponent, { data: {message}})
          },
          error: (err) => {
            console.log("err \n", err)
            //** Restaura los datos del formulario
            this.restoreFormValues();

            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Hubo un error, no pudimos actualizar los datos del mueble"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Hubo un error con el servidor, no pudimos actualizar los datos del mueble"

            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})

          }})    
    }
    catch(err) {
      console.log("err \n", err)
      this.restoreFormValues();

      let errorMessage:string = "Hubo un error, no pudimos actualizar los datos del mueble";

      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage} })
    }
    finally {
      this.toggleEdit();        
    }

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
    this.formDatosMueble.controls['color'].setValue(this.mueble.color?.id || '');
    this.formDatosMueble.controls['modelo'].setValue(this.mueble.modelo?.id || '');
    this.formDatosMueble.controls['notas'].setValue(this.mueble.notas);
    this.formDatosMueble.controls['estado'].setValue(this.mueble.estado?.id || '');
  }



  //** LifeCycles **/
  //** LifeCycles **/

  ngOnInit(): void {
    this.subscribtionMueble$ = this.muebleService.muebleParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.mueble = data
      this.restoreFormValues();
    });
    
    this.subscribtionModelo$ = this.muebleService.modelos$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.modelos = data
      // this.restoreFormValues();
      console.log("Lista Modelos ",data);
    });
    
    this.subscribtionColor$ = this.muebleService.colores$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.colores = data
      // this.restoreFormValues();
      console.log("Lista Colores: ",data);
    });
    
    this.subscribtionEstado$ = this.muebleService.estados$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.estados = data
      // this.restoreFormValues();
      console.log("Lista Estados: ",data);
    });
  
    this.restoreFormValues();  

  }

  // ngAfterViewInit(): void {
  //   this.restoreFormValues(); 
  // }

  ngOnDestroy(): void {
    this.subscribtionMueble$.unsubscribe();
    this.subscribtionModelo$.unsubscribe();
    this.subscribtionColor$.unsubscribe();
    this.subscribtionEstado$.unsubscribe();
  }


}