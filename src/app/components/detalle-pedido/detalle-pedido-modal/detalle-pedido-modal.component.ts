import { Component, Inject } from '@angular/core';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetallePedidoService } from '../detalle-pedido.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.component.html',
  styleUrls: ['./detalle-pedido-modal.component.css']
})
export class DetallePedidoModalComponent {
  pedido:Pedido;
  modalRef:MatDialogRef<DetallePedidoModalComponent>;
  private subscribtionPedido$: Subscription;




  //** Constructor **//
  //** Constructor **//
  constructor(
    // private mueblesAPI:MueblesApiService,
    // @Inject(MAT_DIALOG_DATA) pedido: Pedido
    private pedidoService:PedidoService,
    modalRef:MatDialogRef<DetallePedidoModalComponent>, // lo uso para pasarle la Ref a los métodos que utilizan close() y afterClosed()
  ) {
    // this.pedido = pedido;
    this.modalRef = modalRef;
    this.pedidoService.modalRef = this.modalRef;
  }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    this.subscribtionPedido$ = this.pedidoService.pedidoParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.pedido = data
      console.log("Pedido para detalle: ",data);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionPedido$.unsubscribe();
  }


}


//** Para traer datos del back **/
/*
  getMueblesDelPedido():void {
    this.mueblesAPI.getMueblesPorIdPedido(this.pedido.id)
    .subscribe({
      next: (data) => {
        // console.log("muebles del pedido: \n", data);
        this.muebles = data;
      },
      error: (err) => {
        console.log("err \n", err)
        let modalMessage:string;
        err.status === 0
          ? modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para ver los muebles del pedido"
          : err.status === 401
            ? modalMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para ver los muebles del pedido"
      }})        
  }
*/