import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleClienteModalComponent } from './detalle-cliente-modal/detalle-cliente-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DetalleClienteServiceService {

  private _modalRef:MatDialogRef<DetalleClienteModalComponent>

  
  public get modalRef():MatDialogRef<DetalleClienteModalComponent> {
    return this._modalRef
  }

  
  public set modalRef(ref:MatDialogRef<DetalleClienteModalComponent>) {
    this._modalRef = ref;
  }
  
  constructor() { }
}
