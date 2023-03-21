import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente, Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { ClienteService } from 'src/app/pages/privado/clientes-privado/cliente.service';

@Component({
  selector: 'app-detalle-cliente-item-pedidos',
  templateUrl: './detalle-cliente-item-pedidos.component.html',
  styleUrls: ['./detalle-cliente-item-pedidos.component.css']
})
export class DetalleClienteItemPedidosComponent implements OnInit, OnDestroy {
  // @Input() cliente:Cliente;
  // @Input() muebles:Mueble[];

  pedidos:Pedido[];
  private subscribtionCliente$: Subscription;

  //** Constructor **//
  //** Constructor **//
  constructor(private clienteService:ClienteService) {}



  ngOnInit(): void {
    this.subscribtionCliente$ = this.clienteService.clienteParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.pedidos = data.pedidos;
      console.log("Pedidos de Clientes para detalle: ",this.pedidos);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionCliente$.unsubscribe();
  }


  //** Métodos **//
  //** Métodos **//

  




}
