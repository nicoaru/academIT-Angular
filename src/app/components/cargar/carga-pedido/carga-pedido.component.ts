import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, Color, Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';

@Component({
  selector: 'app-carga-pedido',
  templateUrl: './carga-pedido.component.html',
  styleUrls: ['./carga-pedido.component.css', '../../../styles/form-control.css']
})
export class CargaPedidoComponent {
  // pedido:Pedido;
  nuevosMuebles:Mueble[] = [];
  cliente:Cliente;
  listaClientes:Cliente[];

  editable:boolean = false;
  formDatosPedido:FormGroup;




  //** Constructor **/
  //** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private pedidosAPI:PedidosApiService,
    private clientesAPI:ClientesApiService,
    private dialogRef: MatDialogRef<CargaPedidoComponent>,
    @Inject(MAT_DIALOG_DATA) cliente:Cliente
  ) {
    //* creo el form
    this.cliente = cliente;

    this.formDatosPedido = this.formBuilder.group({
      cliente:[cliente?.id, Validators.required],
      direccionEntrega: [''],
      fechaEntrada: [''],
      fechaEntrega: [''],
      notas: ['']
    });

  }



  //** Métodos **//
  //** Métodos **//
  

  cargarPedido():void {
    try{
      // let nuevoPedido:Pedido = {...this.pedido}
      let nuevoPedido:Pedido = {};

      nuevoPedido.cliente = {id: this.formDatosPedido.value.cliente}
      nuevoPedido.direccionEntrega = this.formDatosPedido.value.direccionEntrega,
      nuevoPedido.fechaEntrada = this.formDatosPedido.value.fechaEntrada,
      nuevoPedido.fechaEntrega = this.formDatosPedido.value.fechaEntrega,
      nuevoPedido.notas = this.formDatosPedido.value.notas,
      nuevoPedido.muebles = this.nuevosMuebles.filter(mueble => Object.keys(mueble).length > 0)

      console.log("Pedido que se va a cargar: ", nuevoPedido)

      this.pedidosAPI.save(nuevoPedido)
      .subscribe({
          next: (data:Pedido) => {
            console.log("Actualizado OK: ", data);
            const message:string = "Pedido cargado con éxito";
            // this.matDialog.open(AlertModalComponent, { data: {message}});
            this.dialogRef.close(true);

          },
          error: (err) => {
            console.log("err \n", err)
  
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Hubo un error, no pudimos cargar el nuevo pedido"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Hubo un error con el servidor, no pudimos cargar el nuevo pedido"
  
            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
  
          }})    
  
    }
    catch(err) {
      console.log("err \n", err)

      let errorMessage:string = "Hubo un error, no pudimos cargar el nuevo pedido";

      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage} })
    }

  }

  precargarMueble(mueble:Mueble, ix:number):void {   
    this.nuevosMuebles.splice(ix, 1, mueble)
    
    console.log("nuevosMuebles:\n",this.nuevosMuebles)
  }

  crearNuevoMueble():void {
    this.nuevosMuebles.push({})

    console.log("nuevosMuebles:\n",this.nuevosMuebles)
  }

  eliminarNuevoMueble(ix:number):void {
    this.nuevosMuebles.splice(ix, 1)

    console.log("nuevosMuebles:\n",this.nuevosMuebles)
  }

  getClientesList():void {
    this.clientesAPI.getList()
    .subscribe({
        next: (data:Cliente[]) => {
          this.listaClientes = data;
        },
        error: (err) => {
          console.log("Error trayendo la lista de clientes: \n", err)

        }})    
  }




  
  //** LifeCycles **/
  //** LifeCycles **/

  ngOnInit(): void {
    if(!this.cliente) this.getClientesList();

  }

  ngOnDestroy(): void {
  }

}
