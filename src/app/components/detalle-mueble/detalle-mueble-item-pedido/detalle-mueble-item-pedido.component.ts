import { Component, Input, OnInit } from '@angular/core';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { DetalleMuebleService } from '../detalle-mueble.service';
import { getISODateStringFromISOString, getISODateStringFromUnixTime } from 'src/app/utils/utils';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { MuebleService } from 'src/app/services/mueble.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-mueble-item-pedido',
  templateUrl: './detalle-mueble-item-pedido.component.html',
  styleUrls: ['./detalle-mueble-item-pedido.component.css', '../../../styles/form-control.css']
})
export class DetalleMuebleItemPedidoComponent implements OnInit {
  private subscribtionMueble$: Subscription;
  pedidoMostrar:Pedido;
  otrosMueblesDelPedido:Mueble[];  



  //** Constructor **//
  //** Constructor **//
  constructor(
    private muebleService:MuebleService
  ) {}




  //** Métodos **//
  //** Métodos **//

  closeModal():void {
    this.muebleService.modalRef.close();
  }



  
  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    this.subscribtionMueble$ = this.muebleService.muebleParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      data.pedido 
        ?  this.pedidoMostrar = {
              ...data.pedido, 
              fechaEntrada: getISODateStringFromISOString(data.pedido?.fechaEntrada), 
              fechaEntrega: getISODateStringFromISOString(data.pedido?.fechaEntrega)
            }
        : null

      this.otrosMueblesDelPedido = data.pedido?.muebles;  
      
      console.log("PedidoMostrar en MuebleDetalle: ",this.pedidoMostrar);
      console.log("OtrosMueblesDelPedido en MuebleDetalle: ",this.otrosMueblesDelPedido);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionMueble$.unsubscribe();
  }


}