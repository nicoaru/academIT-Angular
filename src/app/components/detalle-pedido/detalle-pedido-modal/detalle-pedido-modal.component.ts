import { Component, Inject } from '@angular/core';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetallePedidoService } from '../detalle-pedido.service';


@Component({
  selector: 'app-detalle-pedido-modal',
  templateUrl: './detalle-pedido-modal.component.html',
  styleUrls: ['./detalle-pedido-modal.component.css']
})
export class DetallePedidoModalComponent {
  pedido:Pedido;
  //muebles:Mueble[];

  //** Esto lo voy a usar para el afterClosed
  modalRef:MatDialogRef<DetallePedidoModalComponent>;
  

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



//** Constructor & ngOnInit **/

  constructor(
    private mueblesAPI:MueblesApiService,
    private detallePedidoService:DetallePedidoService,
    modalRef:MatDialogRef<DetallePedidoModalComponent>,
    @Inject(MAT_DIALOG_DATA) pedido: Pedido
  ) {
    this.pedido = pedido;
    this.modalRef = modalRef;
    this.detallePedidoService.modalRef = this.modalRef;
  
    // console.log("cliente en modal: \n", cliente)
  }


  ngOnInit(): void {
    //this.getMueblesDelPedido();
  }



}
