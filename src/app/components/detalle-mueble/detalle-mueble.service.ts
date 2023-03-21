import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleMuebleModalComponent } from './detalle-mueble-modal/detalle-mueble-modal.component';
@Injectable({
  providedIn: 'root'
})
export class DetalleMuebleService {

  private _modalRef:MatDialogRef<DetalleMuebleModalComponent>

  
  public get modalRef():MatDialogRef<DetalleMuebleModalComponent> {
    return this._modalRef
  }

  
  public set modalRef(ref:MatDialogRef<DetalleMuebleModalComponent>) {
    this._modalRef = ref;
  }

  constructor() { }
}
