import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidoService } from 'src/app/pages/privado/pedidos-privado/pedido.service';
import { DetallePedidoService } from '../detalle-pedido.service';

@Component({
  selector: 'app-detalle-pedido-item-muebles',
  templateUrl: './detalle-pedido-item-muebles.component.html',
  styleUrls: ['./detalle-pedido-item-muebles.component.css']
})
export class DetallePedidoItemMueblesComponent implements OnInit {
  muebles:Mueble[];
  private subscribtionPedido$: Subscription;




  //** Constructor **//
  //** Constructor **//
 constructor(private pedidoService:PedidoService) {}



 
  //** Métodos **//
  //** Métodos **//
  closeModal():void {
    this.pedidoService.modalRef.close();
 }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    this.subscribtionPedido$ = this.pedidoService.pedidoParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.muebles = data.muebles;
      console.log("Muebles de Pedido para detalle: ",this.muebles);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionPedido$.unsubscribe();
  }




}