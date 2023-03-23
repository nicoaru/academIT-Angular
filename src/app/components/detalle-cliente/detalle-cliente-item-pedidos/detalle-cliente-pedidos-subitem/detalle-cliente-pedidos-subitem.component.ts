import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { DetalleClienteModalComponent } from '../../detalle-cliente-modal/detalle-cliente-modal.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-detalle-cliente-pedidos-subitem',
  templateUrl: './detalle-cliente-pedidos-subitem.component.html',
  styleUrls: ['./detalle-cliente-pedidos-subitem.component.css']
})
export class DetalleClientePedidosSubitemComponent {
  modalRef:MatDialogRef<DetalleClienteModalComponent>
  
  @Input() pedido:Pedido;
  @Input() muebles:Mueble[];
  @Input() tabIndex:number;





  //** Constructor **//
  //** Constructor **//
  constructor(
    private clienteService:ClienteService,
    private pedidosAPI:PedidosApiService,
    private dialog: MatDialog) {
    this.modalRef = this.clienteService.modalRef;

    console.log("modalRef:\n", this.modalRef)
  }




  //** Métodos **//
  //** Métodos **//

  deletePedido(id:number) {
    this.pedidosAPI.deleteById(id)
      .subscribe({
        next: (data:Pedido) => {
          console.log("Pedido eliminado ok: \n", data);
          // this.pedidoService.deletePedido(data.id
          this.clienteService.getClientes()
            .catch((err)=>{
              let errorMessage:string = "El pedido se eliminó correctamente, pero hubo un problema con el servidor luego...";
              this.dialog.open(AlertModalComponent, { data: {message: errorMessage} })
            })
        },
        error: (err) => {
          console.log("err \n", err)
          let errorMessage:string;
          err.status === 0
          ? errorMessage = "Lo siento tuvimos un problema intentando eliminar el pedido"
          : err.status === 401
            ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : errorMessage = "Lo siento hubo un problema en el servidor intentando eliminar el pedido"

          this.dialog.open(AlertModalComponent, { data: {message: errorMessage} })
        }
      })
  }

  closeModal():void {
    this.modalRef.close();
  }


  // getClientes():void {
  //   this.clientesAPI.getAll()
  //     .subscribe({
  //       next: (data) => {
  //         console.log("data getClientes: \n", data);
  //         this.clienteService.setClientes(data)
  //         this.loading = false;
  //       },
  //       error: (err) => {
  //         console.log("err \n", err)
  //         err.status === 0
  //           ? this.errorMessage = "Lo siento tuvimos un problema intentando traer los datos"
  //           : err.status === 401
  //             ? this.errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
  //             : this.errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Clientes"

  //       }        
  //     })
}



