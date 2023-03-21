import { Component, Input } from '@angular/core';
import { Cliente, Mueble } from 'src/app/models/interfaces/entidades.interfaces';

@Component({
  selector: 'app-detalle-cliente-item-pedidos',
  templateUrl: './detalle-cliente-item-pedidos.component.html',
  styleUrls: ['./detalle-cliente-item-pedidos.component.css']
})
export class DetalleClienteItemPedidosComponent {
  @Input() cliente:Cliente;
  //@Input() muebles:Mueble[];


  

}
