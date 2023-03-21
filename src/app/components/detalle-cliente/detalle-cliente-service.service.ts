import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleClienteModalComponent } from './detalle-cliente-modal/detalle-cliente-modal.component';
import { BehaviorSubject } from 'rxjs';
import { Cliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';

@Injectable({
  providedIn: 'root'
})
export class DetalleClienteServiceService {

  private _modalRef:MatDialogRef<DetalleClienteModalComponent>

  private _clientes:Cliente[] = [];
  private clientes = new BehaviorSubject<Cliente[]>([]);
  public clientes$ = this.clientes.asObservable();

  constructor(private clientesAPI:ClientesApiService) { }


  setClientes(clientes:Cliente[]):void {
    this._clientes = [...clientes]

    this.clientes.next(this._clientes)
  }

  updateCliente(cliente:Cliente):void {
    let ix:number = this._clientes.findIndex(cl => cl.id === cliente.id)
    this._clientes.splice(ix,1,cliente)

    this.clientes.next(this._clientes)
  }

  getClientes():Cliente[] {
    return this._clientes
  }


  
  public get modalRef():MatDialogRef<DetalleClienteModalComponent> {
    return this._modalRef
  }

  
  public set modalRef(ref:MatDialogRef<DetalleClienteModalComponent>) {
    this._modalRef = ref;
  }
  

}
