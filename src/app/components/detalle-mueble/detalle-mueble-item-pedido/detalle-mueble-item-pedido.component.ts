import { Component, Input, OnInit } from '@angular/core';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { DetalleMuebleService } from '../detalle-mueble.service';
import { getISODateStringFromISOString, getISODateStringFromUnixTime } from 'src/app/utils/utils';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';

@Component({
  selector: 'app-detalle-mueble-item-pedido',
  templateUrl: './detalle-mueble-item-pedido.component.html',
  styleUrls: ['./detalle-mueble-item-pedido.component.css']
})
export class DetalleMuebleItemPedidoComponent implements OnInit {
  @Input() mueble:Mueble;
  // pedidoMostrar:any;
  otrosMueblesDelPedido:Mueble[];  
  pedidoMostrar:Pedido;

  closeModal():void {
    this.detallaMuebleService.modalRef.close();
  }

    //** Para traer datos del back **/

    /*
    getMueblesDelPedido():void {
      this.mueblesAPI.getMueblesPorIdPedido(this.mueble.pedido.id)
      .subscribe({
        next: (data) => {
          // console.log("muebles del pedido: \n", data);
          this.otrosMueblesDelPedido = data.filter(mueble => mueble.id !== this.mueble.id);
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
  

  constructor(
    private detallaMuebleService:DetalleMuebleService,
    private mueblesAPI:MueblesApiService
  ) {}
  
  ngOnInit(): void {
    //this.getMueblesDelPedido();

    this.pedidoMostrar = {...this.mueble.pedido};
    this.pedidoMostrar.fechaEntrada = getISODateStringFromISOString(this.mueble.pedido?.fechaEntrada);
    this.pedidoMostrar.fechaEntrega = getISODateStringFromISOString(this.mueble.pedido?.fechaEntrega);

    this.otrosMueblesDelPedido = this.mueble.pedido.muebles;  


  }


}