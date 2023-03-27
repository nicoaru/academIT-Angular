import { Component, Input, OnInit } from '@angular/core';
import { Cliente, Mueble, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditNombreComponent } from './detalle-cliente-edit-nombre/edit-nombre.component';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import { CargaPedidoComponent } from '../../cargar/carga-pedido/carga-pedido.component';

@Component({
  selector: 'app-detalle-cliente-item-datos',
  templateUrl: './detalle-cliente-item-datos.component.html',
  styleUrls: ['./detalle-cliente-item-datos.component.css', '../../../styles/form-control.css']
})
export class DetalleClienteItemDatosComponent implements OnInit {
  cliente:Cliente
  tiposCliente:TipoCliente[];  

  editable:boolean = false;
  formDatosCliente:FormGroup;
  dialogEditNombreRef:MatDialogRef<EditNombreComponent>;
  private subscribtionCliente$: Subscription;
  private subscribtionTiposCliente$: Subscription;




  //** Constructor **/
  //** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private clientesAPI:ClientesApiService,
    private clienteService:ClienteService,
  ) {
    //* creo el form
    this.formDatosCliente = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.email],
      tipoCliente: [''],
      notas: ['']
    })
    //* set disable
    this.formDatosCliente.disable();


  }



  //** Métodos **//
  //** Métodos **//
  
  toggleEdit():void {
    this.formDatosCliente.enabled
      ? this.formDatosCliente.disable()
      : this.formDatosCliente.enable();
  }

  showModalEditNombre():void {
    this.dialogEditNombreRef = this.matDialog.open(EditNombreComponent, {
      data: { nombre: this.formDatosCliente.value.nombre, apellido: this.formDatosCliente.value.apellido }
    })
    this.dialogEditNombreRef.afterClosed().subscribe(data => {
      if(data) {
        this.formDatosCliente.controls['nombre'].setValue(data.nombre);
        this.formDatosCliente.controls['apellido'].setValue(data.apellido);        
      }
    })

  }

  saveChanges():void {
    try{
      let updatedCliente:Cliente = {...this.cliente}

      updatedCliente.nombre = this.formDatosCliente.value.nombre,
      updatedCliente.apellido = this.formDatosCliente.value.apellido,
      updatedCliente.telefono = this.formDatosCliente.value.telefono,
      updatedCliente.email = this.formDatosCliente.value.email,
      updatedCliente.notas = this.formDatosCliente.value.notas,
      updatedCliente.tipoCliente = {id: this.formDatosCliente.value.tipoCliente}
  
      console.log("cliente a actualizar: ", updatedCliente)
      this.clientesAPI.updateById(this.cliente.id, updatedCliente)
      .subscribe({
          next: (data) => {
            console.log("Actualizado OK: ", data);
            this.clienteService.updateCliente(data);
            this.clienteService.setClienteParaDetalle(data.id);
            let message = `Cliente modificado con éxito`
            this.matDialog.open(AlertModalComponent, { data: {message}})
          },
          error: (err) => {
            console.log("err \n", err)
            //** Restaura los datos del formulario
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
    this.restoreFormValues()
    this.toggleEdit();
  }

  cargarPedido():void {
    let cargaPedidoModalRef = this.matDialog.open(CargaPedidoComponent, {
      width: '80%',
      height: '90%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false,
      data: this.cliente
    })
    cargaPedidoModalRef.beforeClosed().subscribe(seCreoMueble => {
      if(seCreoMueble) {
        this.refreshClientes()
        let message = `Pedido cargado con éxito`;
        this.matDialog.open(AlertModalComponent, { data: {message}});
      }
    })

  }

  async refreshClientes():Promise<void> {
    try {
      console.log("inicio")
      let result = await this.clienteService.getClientes()
      console.log("resultado: ", result)
    }
    catch(err) {
      console.log("Error en getCleintes:\n", err)
      let errorMessage = "Pedido cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"
      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
    } 
  }

  // refreshClienteFromDB():any {
  //   this.clientesAPI.getById(this.cliente.id)
  //     .subscribe({
  //       next: (data) => {
  //           console.log("Cliente con pedido nuevo: ", data);
  //           this.clienteService.setClienteParaDetalle(data.id);
  //           this.clienteService.updateCliente(data);
  //           let message = `Cliente cargado con éxito`
  //           this.matDialog.open(AlertModalComponent, { data: {message}})
  //       },
  //       error: (err) => {
  //         console.log("err \n", err)

  //         let errorMessage:string;
  //         err.status === 0
  //           ? errorMessage = "Pedido cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"
  //           : err.status === 401
  //             ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
  //             : errorMessage = "Pedido cargado con éxito pero quizas no lo puedas ver en pantalla porque algo falló"

  //         this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})

  //       }
  //     })
  // }

  restoreFormValues():void {
    this.formDatosCliente.controls['nombre'].setValue(this.cliente.nombre);
    this.formDatosCliente.controls['apellido'].setValue(this.cliente.apellido);
    this.formDatosCliente.controls['telefono'].setValue(this.cliente.telefono);
    this.formDatosCliente.controls['email'].setValue(this.cliente.email);
    this.formDatosCliente.controls['tipoCliente'].setValue(this.cliente.tipoCliente?.id);
    this.formDatosCliente.controls['notas'].setValue(this.cliente.notas);     
  }

  
  //** LifeCycles **/
  //** LifeCycles **/

  ngOnInit(): void {
    this.subscribtionCliente$ = this.clienteService.clienteParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.cliente = data
      console.log("Cliente para detalle: ",data);
    });
    
    this.subscribtionTiposCliente$ = this.clienteService.tiposCliente$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.tiposCliente = data
      console.log("Lista tiposCliente: ",data);
    });
        
    this.restoreFormValues();  
  }

  ngOnDestroy(): void {
    this.subscribtionCliente$.unsubscribe();
    this.subscribtionTiposCliente$.unsubscribe();
  }


}
