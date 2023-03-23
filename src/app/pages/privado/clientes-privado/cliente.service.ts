import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetalleClienteModalComponent } from 'src/app/components/detalle-cliente/detalle-cliente-modal/detalle-cliente-modal.component';
import { Cliente, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _modalRef:MatDialogRef<DetalleClienteModalComponent>

  private _clientes:Cliente[];
  private clientes = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientes.asObservable();

  private _clienteParaDetalle:Cliente;
  private clienteParaDetalle = new BehaviorSubject<Cliente>({});
  public clienteParaDetalle$ = this.clienteParaDetalle.asObservable();

  private _tiposCliente:TipoCliente[];
  


  //** Constructor **//
  //** Constructor **//
  constructor() { }


  //** Métodos **//
  //** Métodos **//
  setClientes(clientes:Cliente[]):void {
    this._clientes = [...clientes]

    this.clientes.next(this._clientes)
  }
  updateCliente(cliente:Cliente):void {
    let ix:number = this._clientes.findIndex(cl => cl.id === cliente.id)
    let clientesActualizado = [...this._clientes]
    clientesActualizado.splice(ix, 1, cliente)
    this._clientes = clientesActualizado
    this.clientes.next(this._clientes)
  }
  deleteCliente(idCliente:number):void {
    let ix:number = this._clientes.findIndex(cl => cl.id === idCliente)
    let clientesActualizado = [...this._clientes]
    clientesActualizado.splice(ix, 1)
    this._clientes = clientesActualizado
    this.clientes.next(this._clientes)
  }  
  
  getClientes():Cliente[] {
    return this._clientes
  }

  setClienteParaDetalle(cliente:Cliente):void {
    this._clienteParaDetalle = {...cliente};

    this.clienteParaDetalle.next(this._clienteParaDetalle)
  }
  getClienteParaDetalle():Cliente {
    return this._clienteParaDetalle
  }

  public get tiposCliente():TipoCliente[] {
    return this._tiposCliente
  }
  public set tiposCliente(tiposCliente:TipoCliente[]) {
    this._tiposCliente = tiposCliente;
  }

  public get modalRef():MatDialogRef<DetalleClienteModalComponent> {
    return this._modalRef
  }  
  public set modalRef(ref:MatDialogRef<DetalleClienteModalComponent>) {
    this._modalRef = ref;
  }


}
