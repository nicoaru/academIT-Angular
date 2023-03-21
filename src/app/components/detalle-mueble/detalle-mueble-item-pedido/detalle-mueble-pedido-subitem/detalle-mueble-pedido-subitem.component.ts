import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleMuebleService } from 'src/app/components/detalle-mueble/detalle-mueble.service';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';

import { DetalleMuebleModalComponent } from '../../detalle-mueble-modal/detalle-mueble-modal.component';

@Component({
  selector: 'app-detalle-mueble-pedido-subitem',
  templateUrl: './detalle-mueble-pedido-subitem.component.html',
  styleUrls: ['./detalle-mueble-pedido-subitem.component.css']
})
export class DetalleMueblePedidoSubitemComponent implements OnInit {
  @Input() muebles:Mueble[];

  modalRef:MatDialogRef<DetalleMuebleModalComponent>

  closeModal():void {
    this.modalRef.close();
 }

 constructor(private detalleMuebleService:DetalleMuebleService ) {
  this.modalRef = detalleMuebleService.modalRef;

  console.log("modalRef:\n", this.modalRef)
 }

  ngOnInit(): void {}

}
