import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetalleClienteModalComponent } from 'src/app/components/detalle-cliente/detalle-cliente-modal/detalle-cliente-modal.component';
import { Cliente, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { TiposClienteApiService } from './api/tipos-cliente-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _modalRef:MatDialogRef<DetalleClienteModalComponent>

  private _clientes:Cliente[];
  private clientes = new BehaviorSubject<Cliente[]>(null);
  public clientes$ = this.clientes.asObservable();

  private _clienteParaDetalle:Cliente;
  private clienteParaDetalle = new BehaviorSubject<Cliente>({});
  public clienteParaDetalle$ = this.clienteParaDetalle.asObservable();

  private _tiposCliente:TipoCliente[];
  private tiposCliente = new BehaviorSubject<TipoCliente[]>([]);
  public tiposCliente$ = this.tiposCliente.asObservable();
  


  //** Constructor **//
  //** Constructor **//
  constructor(
    private clientesAPI:ClientesApiService,
    private tiposClienteAPI:TiposClienteApiService) { }


  //** Métodos **//
  //** Métodos **//

  // Clientes
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
  
  getClientes():any {
    
    return new Promise((resolve, reject)=>{

      this.clientesAPI.getAll()
        .subscribe({
          next: (data) => {
            console.log("data getClientes: \n", data);
            this.setClientes(data)
            this.setClienteParaDetalle(this.getClienteParaDetalle()?.id)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Clientes"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }



  // Cliente para detalle
  setClienteParaDetalle(idCliente:number):void {
    idCliente
      ? this._clienteParaDetalle = this._clientes.find(ped => ped.id === idCliente)
      : null

    this.clienteParaDetalle.next(this._clienteParaDetalle)
  }
  getClienteParaDetalle():Cliente {
    return this._clienteParaDetalle
  }



    // TposCliente
    setTiposCliente(tiposCliente:TipoCliente[]):void {
      this._tiposCliente = [...tiposCliente]
  
      this.tiposCliente.next(this._tiposCliente)
    }
  
    getTiposCliente():any {
      
      return new Promise((resolve, reject)=>{
  
        this.tiposClienteAPI.getAll()
          .subscribe({
            next: (data) => {
              console.log("data getTiposCliente: \n", data);
              this.setTiposCliente(data)
              resolve({ok: true})
            },
            error: (err) => {
              console.log("err \n", err)
              let errorMessage:string;
              err.status === 0
                ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos de los TiposCliente"
                : err.status === 401
                  ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                  : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los TiposCliente"
              reject({ok: false, error: err, message: errorMessage})
            }        
          })
      })
    }




  // public get tiposCliente():TipoCliente[] {
  //   return this._tiposCliente
  // }
  // public set tiposCliente(tiposCliente:TipoCliente[]) {
  //   this._tiposCliente = tiposCliente;
  // }

  public get modalRef():MatDialogRef<DetalleClienteModalComponent> {
    return this._modalRef
  }  
  public set modalRef(ref:MatDialogRef<DetalleClienteModalComponent>) {
    this._modalRef = ref;
  }


}
