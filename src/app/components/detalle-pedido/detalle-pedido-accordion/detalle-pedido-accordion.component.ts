import { Component, Input } from '@angular/core';
import { Pedido, Mueble } from 'src/app/models/interfaces/entidades.interfaces';

@Component({
  selector: 'app-detalle-pedido-accordion',
  templateUrl: './detalle-pedido-accordion.component.html',
  styleUrls: ['./detalle-pedido-accordion.component.css']
})
export class DetallePedidoAccordionComponent {
  @Input() pedido:Pedido;
  //@Input() muebles:Mueble[];


  constructor(
  ) {
    // console.log("cliente en accordion: \n", this.cliente);
    // console.log("tiposCliente en accordion: \n", this.tiposCliente);
    // console.log("muebles en accordion: \n", this.muebles);
  }

}
