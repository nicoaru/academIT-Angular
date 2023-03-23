import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { Subscription } from 'rxjs';
import { PedidoService } from './pedido.service';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { CargaPedidoComponent } from 'src/app/components/cargar/carga-pedido/carga-pedido.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';


@Component({
  selector: 'app-pedidos-privado',
  templateUrl: './pedidos-privado.component.html',
  styleUrls: ['./pedidos-privado.component.css']
})
export class PedidosPrivadoComponent {
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
  dialogDetalleRef:MatDialogRef<DetallePedidoModalComponent>;
  private subscriptionPedidos$:Subscription;

  pedidos:Pedido[];
  
  loading:boolean = false;
  errorMessage:string;
  showModal:boolean =  false;




  //** Constructor **//
  //** Constructor **//
  constructor(
    private pedidosAPI:PedidosApiService,
    private clienteAPI:ClientesApiService,
    private dialog: MatDialog,
    private pedidoService:PedidoService,
  ) {}




  //** Métodos **//
  //** Métodos **//

  showDetails(id:number): void {
    const pedidoParaDetalle = this.pedidos.find(pedido => pedido.id == id);
    this.pedidoService.setPedidoParaDetalle(pedidoParaDetalle);

    this.dialogDetalleRef = this.dialog.open(DetallePedidoModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      autoFocus: false,
      // data: pedidoParaDetalle
    });

    // this.dialogDetalleRef.afterClosed().subscribe(() => this.getPedidos())
  }

  deletePedido(id:number) {
    this.pedidosAPI.deleteById(id)
      .subscribe({
        next: (data:Pedido) => {
          console.log("Pedido eliminado ok: \n", data);
          this.pedidoService.deletePedido(data.id)
        },
        error: (err) => {
          console.log("err \n", err)
          let errorMessage;
          err.status === 0
          ? errorMessage = "Lo siento tuvimos un problema intentando eliminar el pedido"
          : err.status === 401
            ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : errorMessage = "Lo siento hubo un problema en el servidor intentando eliminar el pedido"

          this.dialog.open(AlertModalComponent, { data: {message: errorMessage} })
        }
      })
  }

  cargarNuevo():void {
    let dialogCargarClienteRef = this.dialog.open(CargaPedidoComponent, {
      width: '80%',
      maxHeight: '80vh',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false
    });
    dialogCargarClienteRef.beforeClosed()
      .subscribe(seCreoPedido => {
        if(seCreoPedido) {
          this.dialog.open(AlertModalComponent, { data: {message: 'Pedido creado con éxito'}})
          this.getPedidos();
        }
      })
  }

  getPedidos():void {
      this.loading = true;  
      this.pedidosAPI.getAll()
        .subscribe({
          next: (data:Pedido[]) => {
            console.log("data getPedidos: \n", data);
            this.pedidoService.setPedidos(data)
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

  getListaClientes():void {
    this.clienteAPI.getList()
    .subscribe({
      next: (data) => {
        console.log("data lista clientes: \n", data);
        this.pedidoService.clientesList = data;
      },
      error: (err) => {
        console.log("err \n", err)
        let modalMessage:string;
        err.status === 0
          ? modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
          : err.status === 401
            ? modalMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
      }})    
  }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit() {
    this.subscriptionPedidos$ = this.pedidoService.pedidos$
      .subscribe(data => {
        // Cada vez que el observable emita un valor, se ejecutará este código
        this.pedidos = [...data]
        console.log("Clientes del observable ese en PedidoPrivado: ",data);
      });

    this.getPedidos();
    this.getListaClientes();
  }

  ngOnDestroy(): void {
    this.subscriptionPedidos$.unsubscribe();
  }


}
