import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetallePedidoModalComponent } from './detalle-pedido-modal/detalle-pedido-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private _modalRef:MatDialogRef<DetallePedidoModalComponent>

  
  public get modalRef():MatDialogRef<DetallePedidoModalComponent> {
    return this._modalRef
  }

  
  public set modalRef(ref:MatDialogRef<DetallePedidoModalComponent>) {
    this._modalRef = ref;
  }

  constructor() { }
}
