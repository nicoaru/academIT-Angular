import { Component, Input, OnInit } from '@angular/core';
import { Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { DetallePedidoService } from '../detalle-pedido.service';

@Component({
  selector: 'app-detalle-pedido-item-muebles',
  templateUrl: './detalle-pedido-item-muebles.component.html',
  styleUrls: ['./detalle-pedido-item-muebles.component.css']
})
export class DetallePedidoItemMueblesComponent implements OnInit {
  @Input() muebles:Mueble[];

  closeModal():void {
    this.detallaPedidoService.modalRef.close();
 }

 constructor(private detallaPedidoService:DetallePedidoService) {}
  ngOnInit(): void {
    console.log("Muebles en itemMueble:\n", this.muebles)
  }


}