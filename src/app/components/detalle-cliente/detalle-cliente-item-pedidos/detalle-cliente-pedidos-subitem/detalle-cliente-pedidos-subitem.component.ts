import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/pages/privado/clientes-privado/cliente.service';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { DetalleClienteModalComponent } from '../../detalle-cliente-modal/detalle-cliente-modal.component';

@Component({
  selector: 'app-detalle-cliente-pedidos-subitem',
  templateUrl: './detalle-cliente-pedidos-subitem.component.html',
  styleUrls: ['./detalle-cliente-pedidos-subitem.component.css']
})
export class DetalleClientePedidosSubitemComponent {
  modalRef:MatDialogRef<DetalleClienteModalComponent>
  
  @Input() pedido:Pedido;
  @Input() muebles:Mueble[];
  @Input() tabIndex:number;





  //** Constructor **//
  //** Constructor **//
  constructor(private clienteService:ClienteService ) {
    this.modalRef = this.clienteService.modalRef;

    console.log("modalRef:\n", this.modalRef)
  }




  //** Métodos **//
  //** Métodos **//

  closeModal():void {
    this.modalRef.close();
  }


}
