import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Cliente, Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { getLocaleDateStringFromUnixTime } from 'src/app/utils/utils';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';


@Component({
  selector: 'app-pedidos-privado',
  templateUrl: './pedidos-privado.component.html',
  styleUrls: ['./pedidos-privado.component.css']
})
export class PedidosPrivadoComponent {
  dialogDetalleRef:MatDialogRef<DetallePedidoModalComponent>;

  columns:ColumnTableInfoDefinition[] = [
    {
      title: "N°",
      field: "id",
    },
    {
      title: "Cliente",
      field: "cliente",
      getter: (pedido:Pedido) => {
        return pedido.cliente?.nombre+' '+pedido.cliente?.apellido
      }
    },
    {
      title: "Entrada",
      field: "fechaEntrada",
      getter: (pedido:Pedido) => {
        return new Date(pedido.fechaEntrada).toLocaleDateString();
      }
    },
    {
      title: "Entrega",
      field: "fechaEntrega",
      getter: (pedido:Pedido) => {
        return new Date(pedido.fechaEntrega).toLocaleDateString();
      }
    },
    {
      title: "Dirección entrega",
      field: "direccionEntrega",
    }
  ];

  pedidos:Pedido[];


  loading:boolean = false;
  errorMessage:string;

  showModal:boolean =  false;

  showDetails(id:number): void {
    const pedidoParaDetalle = this.pedidos.find(cliente => cliente.id == id);

    this.dialogDetalleRef = this.dialog.open(DetallePedidoModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      autoFocus: false,
      data: pedidoParaDetalle
    });

    this.dialogDetalleRef.afterClosed().subscribe(() => this.getPedidos())
  }


  getPedidos():void {
      this.loading = true;  
      this.pedidosAPI.getAll()
        .subscribe({
          next: (data:Pedido[]) => {
            console.log("data getPedidos: \n", data);
            this.pedidos = data;
            console.log("data Pedidos: \n", this.pedidos);
            this.loading = false;
          },
          error: (err) => {
            console.log("err \n", err)
            err.status === 0
              ? this.errorMessage = "Lo siento tuvimos un problema intentando traer los datos"
              : err.status === 401
                ? this.errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : this.errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Clientes"

              this.loading = false;
          }        
        })
  }




  constructor(
    private pedidosAPI:PedidosApiService,
    private dialog: MatDialog
  ) {}
 
  ngOnInit() {
    this.getPedidos();

  }


}
