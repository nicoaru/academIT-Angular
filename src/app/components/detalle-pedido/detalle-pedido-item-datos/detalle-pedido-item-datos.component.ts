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
import { PedidoService } from 'src/app/services/pedido.service';
import { CargaMuebleComponent } from '../../cargar/carga-mueble/carga-mueble.component';

@Component({
  selector: 'app-detalle-pedido-item-datos',
  templateUrl: './detalle-pedido-item-datos.component.html',
  styleUrls: ['./detalle-pedido-item-datos.component.css', '../../../styles/form-control.css']
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
      cliente:['', Validators.required],
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
  
      console.log("pedido a actualizar ", updatedPedido)
  
      this.pedidosAPI.updateById(this.pedido.id, updatedPedido)
      .subscribe({
          next: (data) => {
            console.log("Pedido actualizado: ", data);
            this.pedidoService.updatePedido(data);
            this.pedidoService.setPedidoParaDetalle(data.id);
            let message = `Pedido modificado con éxito`
            this.matDialog.open(AlertModalComponent, { data: {message}})
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
  
            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage} })
  
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

  cargarMueble():void {
    let cargaMuebleModalRef = this.matDialog.open(CargaMuebleComponent, {
      width: '80%',
      height: '60%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false,
      data: {pedido: this.pedido}
    })
    cargaMuebleModalRef.beforeClosed().subscribe(seCreoMueble => {
      if(seCreoMueble) this.refreshPedidos()
    })

  }

  async refreshPedidos():Promise<void> {
    try {
      console.log("inicio")
      let result = await this.pedidoService.getPedidos()
      console.log("resultado: ", result)
    }
    catch(err) {
      console.log("Error en getCleintes:\n", err)
      let errorMessage = "Mueble cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"
      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
    } 
  }

  // refreshPedidoFromDB():any {
  //   this.pedidosAPI.getById(this.pedido.id)
  //     .subscribe({
  //       next: (data) => {
  //           console.log("Pedido con mueble nuevo: ", data);
  //           this.pedidoService.updatePedido(data);
  //           this.pedidoService.setPedidoParaDetalle(data.id);
  //           let message = `Mueble cargado con éxito`
  //           this.matDialog.open(AlertModalComponent, { data: {message}})
  //       },
  //       error: (err) => {
  //         console.log("err \n", err)

  //         let errorMessage:string;
  //         err.status === 0
  //           ? errorMessage = "Mueble cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"
  //           : err.status === 401
  //             ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
  //             : errorMessage = "Mueble cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"

  //         this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})

  //       }
  //     })
  // }

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
  }

  ngOnDestroy(): void {
    this.subscribtionPedido$.unsubscribe();
  }


}




