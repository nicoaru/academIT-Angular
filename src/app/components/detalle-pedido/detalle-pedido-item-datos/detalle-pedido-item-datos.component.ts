import { Component, Input, OnInit } from '@angular/core';
import { Cliente, Pedido, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import { getISODateStringFromISOString, getISODateStringFromUnixTime, getUnixTimeFromString } from 'src/app/utils/utils';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { Subscription } from 'rxjs';
import { PedidoService } from 'src/app/pages/privado/pedidos-privado/pedido.service';

@Component({
  selector: 'app-detalle-pedido-item-datos',
  templateUrl: './detalle-pedido-item-datos.component.html',
  styleUrls: ['./detalle-pedido-item-datos.component.css']
})
export class DetallePedidoItemDatosComponent {
  pedido:Pedido;
  listaClientes:Cliente[];
  editable:boolean = false;
  formDatosPedido:FormGroup;
  private subscribtionPedido$: Subscription;







  //** Constructor **/
  //** Constructor **/

  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private pedidosAPI:PedidosApiService,
    private pedidoService:PedidoService
  ) {
    //* creo el form
    this.formDatosPedido = this.formBuilder.group({
      cliente:[''],
      direccionEntrega: [''],
      fechaEntrada: [''],
      fechaEntrega: [''],
      notas: [''],
      nombreCliente: ['']
    })
    //* set disable
    this.formDatosPedido.disable();
  }




  //** Métodos **/
  //** Métodos **/

  toggleEdit():void {
    this.formDatosPedido.enabled
      ? this.formDatosPedido.disable()
      : this.formDatosPedido.enable();
  }


  saveChanges():void {
    try {
      let updatedPedido:Pedido = {...this.pedido}

      updatedPedido.cliente = {id: this.formDatosPedido.value.cliente}
      updatedPedido.direccionEntrega = this.formDatosPedido.value.direccionEntrega,
      updatedPedido.fechaEntrada = this.formDatosPedido.value.fechaEntrada,
      updatedPedido.fechaEntrega = this.formDatosPedido.value.fechaEntrega,
      updatedPedido.notas = this.formDatosPedido.value.notas,
  
      console.log("pedidoActualizado: ", updatedPedido)
  
      this.pedidosAPI.updateById(this.pedido.id, updatedPedido)
      .subscribe({
          next: (data) => {
            console.log("Pedido actualizado: ", data);
            this.pedidoService.setPedidoParaDetalle(data);
            this.pedidoService.updatePedido(data);
          },
          error: (err) => {
            console.log("err \n", err)
            this.restoreFormValues();
  
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Hubo un error, no pudimos actualizar los datos del cliente"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Hubo un error con el servidor, no pudimos actualizar los datos del cliente"
  
            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
  
          }})    
    }
    catch(err) {
      console.log("err \n", err)
      this.restoreFormValues();

      let errorMessage:string = "Hubo un error, no pudimos actualizar los datos del cliente";

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
    this.formDatosPedido.controls['cliente'].setValue(this.pedido.cliente?.id);
    this.formDatosPedido.controls['direccionEntrega'].setValue(this.pedido.direccionEntrega);
    this.formDatosPedido.controls['fechaEntrada'].setValue(getISODateStringFromISOString(this.pedido.fechaEntrada));
    this.formDatosPedido.controls['fechaEntrega'].setValue(getISODateStringFromISOString(this.pedido.fechaEntrega));
    this.formDatosPedido.controls['notas'].setValue(this.pedido.notas);
    this.formDatosPedido.controls['nombreCliente'].setValue(this.pedido.cliente?.nombre+' '+this.pedido.cliente?.apellido);   
  }





//** ngOnInit **/
  ngOnInit(): void {
    this.subscribtionPedido$ = this.pedidoService.pedidoParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.pedido = data
      console.log("Pedido para detalle: ",data);
    });

    this.listaClientes = this.pedidoService.clientesList;
    console.log("Lista clientes - en item datos \n", this.listaClientes)

    this.restoreFormValues();  
    console.warn("Form:\n", this.formDatosPedido)
  }

  ngOnDestroy(): void {
    this.subscribtionPedido$.unsubscribe();
  }


}




