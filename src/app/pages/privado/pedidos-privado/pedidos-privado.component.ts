import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Pedido } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidosApiService } from 'src/app/services/api/pedidos-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { Subscription } from 'rxjs';
import { PedidoService } from '../../../services/pedido.service';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { CargaPedidoComponent } from 'src/app/components/cargar/carga-pedido/carga-pedido.component';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { ActivatedRoute } from '@angular/router';


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
  private subscriptionId$:Subscription;

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
    private route:ActivatedRoute
  ) {}




  //** Métodos **//
  //** Métodos **//

  showDetails(id:number): void {
    // const pedidoParaDetalle = this.pedidos.find(pedido => pedido.id == id);
    this.pedidoService.setPedidoParaDetalle(id);

    this.dialogDetalleRef = this.dialog.open(DetallePedidoModalComponent, {
      width: '80%',
      height: '90%',
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
      height: '90%',
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

  async getPedidos():Promise<void> {
    try {
      console.log("inicio")
      this.loading = true;
      let result = await this.pedidoService.getPedidos()
      console.log("resultado: ", result)
    }
    catch(err) {
      console.log("Error en getPedidoss:\n", err)
      this.errorMessage = err.message;
    } 
    finally{ this.loading = false; }  
  }

  async getListaClientes():Promise<void> {
    try {
      let result = await this.pedidoService.getClientesList()
      console.log("resultado getListaClientes: ", result)
    }
    catch(err) {
      console.log("Error en getListaClientes:\n", err)     
    }      
  }




  //** LifeCycles **//
  //** LifeCycles **//
  async ngOnInit() {
    this.subscriptionPedidos$ = this.pedidoService.pedidos$
      .subscribe(data => {
        // Cada vez que el observable emita un valor, se ejecutará este código
        Array.isArray(data)
        ? this.pedidos = [...data]
        : this.pedidos = data;
        console.log("Clientes del observable ese en PedidoPrivado: ",data);
      });

    await this.getPedidos();
    await this.getListaClientes();

    this.subscriptionId$ = this.route.paramMap
      .subscribe(data => {
        let id = data.get('id');
        console.log("Id pedido por parámetro: ", id)
        if(Number(id)) {
          this.showDetails(Number(id))
        }
    })


  }

  ngOnDestroy(): void {
    this.subscriptionPedidos$.unsubscribe();
    this.subscriptionId$.unsubscribe();
  }

}