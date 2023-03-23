import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { Pedido, Cliente } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';

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
  constructor(private pedidosAPI:PedidosApiService) { }


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

  getPedidos():any {
    
    return new Promise((resolve, reject)=>{

      this.pedidosAPI.getAll()
        .subscribe({
          next: (data) => {
            console.log("data getPedidos: \n", data);
            this.setPedidos(data)
            this.setPedidoParaDetalle(this.getPedidoParaDetalle()?.id)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Pedidos"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }

  setPedidoParaDetalle(idPedido:number):void {
    this._pedidoParaDetalle = this._pedidos.find(ped => ped.id === idPedido);

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
