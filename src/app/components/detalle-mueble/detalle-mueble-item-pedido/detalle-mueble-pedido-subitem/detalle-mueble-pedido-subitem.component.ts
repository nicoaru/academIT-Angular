import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleMuebleService } from 'src/app/components/detalle-mueble/detalle-mueble.service';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { MuebleService } from 'src/app/pages/privado/muebles-privado/mueble.service';

import { DetalleMuebleModalComponent } from '../../detalle-mueble-modal/detalle-mueble-modal.component';

@Component({
  selector: 'app-detalle-mueble-pedido-subitem',
  templateUrl: './detalle-mueble-pedido-subitem.component.html',
  styleUrls: ['./detalle-mueble-pedido-subitem.component.css']
})
export class DetalleMueblePedidoSubitemComponent {
  modalRef:MatDialogRef<DetalleMuebleModalComponent>
  
  @Input() muebles:Mueble[];




  //** Constructor **//
  //** Constructor **//
  constructor(private muebleService:MuebleService ) {
    this.modalRef = muebleService.modalRef;

    console.log("modalRef:\n", this.modalRef)
  }




  //** Métodos **//
  //** Métodos **//

  closeModal():void {
    this.modalRef.close();
  }

}
