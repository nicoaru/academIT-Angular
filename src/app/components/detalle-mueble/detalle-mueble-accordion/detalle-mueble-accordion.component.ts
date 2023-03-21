import { Component, Input } from '@angular/core';
import { Pedido, Mueble, Color, Modelo, Estado } from 'src/app/models/interfaces/entidades.interfaces';

@Component({
  selector: 'app-detalle-mueble-accordion',
  templateUrl: './detalle-mueble-accordion.component.html',
  styleUrls: ['./detalle-mueble-accordion.component.css']
})
export class DetalleMuebleAccordionComponent {
  @Input() mueble:Mueble;
  @Input() modelos:Modelo[];
  @Input() colores:Color[];
  @Input() estados:Estado[];

  constructor(
  ) {
    // console.log("cliente en accordion: \n", this.cliente);
    // console.log("tiposCliente en accordion: \n", this.tiposCliente);
    // console.log("muebles en accordion: \n", this.muebles);
  }

}
