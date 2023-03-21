import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DetalleClienteServiceService } from 'src/app/components/detalle-cliente/detalle-cliente-service.service';
import { Mueble, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { DetalleClienteModalComponent } from '../../detalle-cliente-modal/detalle-cliente-modal.component';

@Component({
  selector: 'app-detalle-cliente-pedidos-subitem',
  templateUrl: './detalle-cliente-pedidos-subitem.component.html',
  styleUrls: ['./detalle-cliente-pedidos-subitem.component.css']
})
export class DetalleClientePedidosSubitemComponent implements OnInit {
  @Input() pedido:Pedido;
  @Input() muebles:Mueble[];
  @Input() tabIndex:number;
  //mueblesPedido: Mueble[];

  modalRef:MatDialogRef<DetalleClienteModalComponent>

  closeModal():void {
    this.modalRef.close();
 }

 constructor(private detalleClienteService:DetalleClienteServiceService ) {
  this.modalRef = detalleClienteService.modalRef;

  console.log("modalRef:\n", this.modalRef)
 }

  ngOnInit(): void {
    //this.mueblesPedido =  this.muebles.filter(mueble => mueble.pedido.id === this.pedido.id)
  }

}
