import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { Pedido, Cliente } from 'src/app/models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private _modalRef:MatDialogRef<DetallePedidoModalComponent>

  private _pedidos:Pedido[];
  private pedidos = new BehaviorSubject<Pedido[]>([]);
  public pedidos$ = this.pedidos.asObservable();

  private _pedidoParaDetalle:Pedido;
  private pedidoParaDetalle = new BehaviorSubject<Pedido>({});
  public pedidoParaDetalle$ = this.pedidoParaDetalle.asObservable();

  private _clientesList:Cliente[];
  


  //** Constructor **//
  //** Constructor **//
  constructor() { }


  //** Métodos **//
  //** Métodos **//
  setPedidos(pedidos:Pedido[]):void {
    this._pedidos = [...pedidos]

    this.pedidos.next(this._pedidos)
  }
  updatePedido(pedido:Pedido):void {
    let ix:number = this._pedidos.findIndex(ped => ped.id === pedido.id)
    let pedidosActualizado = [...this._pedidos]
    pedidosActualizado.splice(ix, 1, pedido)
    this._pedidos = pedidosActualizado
    this.pedidos.next(this._pedidos)
  }
  deletePedido(idPedido:number):void {
    let ix:number = this._pedidos.findIndex(cl => cl.id === idPedido)
    let pedidosActualizado = [...this._pedidos]
    pedidosActualizado.splice(ix, 1)
    this._pedidos = pedidosActualizado
    this.pedidos.next(this._pedidos)
  }  

  getPedidos():Pedido[] {
    return this._pedidos
  }

  setPedidoParaDetalle(pedido:Pedido):void {
    this._pedidoParaDetalle = {...pedido};

    this.pedidoParaDetalle.next(this._pedidoParaDetalle)
  }
  getPedidoParaDetalle():Pedido {
    return this._pedidoParaDetalle
  }

  public get clientesList():Cliente[] {
    return this._clientesList
  }
  public set clientesList(clientes:Cliente[]) {
    this._clientesList = clientes;
  }

  public get modalRef():MatDialogRef<DetallePedidoModalComponent> {
    return this._modalRef
  }  
  public set modalRef(ref:MatDialogRef<DetallePedidoModalComponent>) {
    this._modalRef = ref;
  }

}
