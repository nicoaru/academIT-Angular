import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Cliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetalleClienteModalComponent } from 'src/app/components/detalle-cliente/detalle-cliente-modal/detalle-cliente-modal.component';
import { ClienteService } from './cliente.service';
import { Subscription } from 'rxjs';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';


@Component({
  selector: 'app-clientes-privado',
  templateUrl: './clientes-privado.component.html',
  styleUrls: ['./clientes-privado.component.css']
})
export class ClientesPrivadoComponent implements OnInit {
  columns:ColumnTableInfoDefinition[] = [
    {
      title: "Nombre",
      field: "nombre",
      getter: (cliente:Cliente) => {
        return cliente.nombre+" "+cliente.apellido
      }
    },
    {
      title: "Teléfono",
      field: "telefono",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Tipo cliente",
      field: "tipoCliente",
      getter: (cliente:Cliente) => {
        return cliente.tipoCliente?.nombre
      }
    }
  ];
  dialogDetalleRef:MatDialogRef<DetalleClienteModalComponent>;
  private subscriptionClientes$:Subscription;  

  clientes:Cliente[];

  loading:boolean = false;
  errorMessage:string;
  showModal:boolean =  false;




  //** Constructor **//
  //** Constructor **//
  constructor(
    private clientesAPI:ClientesApiService,
    private tiposClienteAPI:TiposClienteApiService,
    private clienteService:ClienteService,
    private dialog: MatDialog
  ) {}




  //** Métodos **//
  //** Métodos **//

  showDetails(id:number): void {
    const clienteParaDetalle = this.clientes.find(cliente => cliente.id == id);
    this.clienteService.setClienteParaDetalle(clienteParaDetalle);

    this.dialogDetalleRef = this.dialog.open(DetalleClienteModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false
      //data: clienteParaDetalle
    });

    //this.dialogDetalleRef.afterClosed().subscribe(() => this.getClientes())
  }


  getClientes():void {
      this.loading = true;  
      this.clientesAPI.getAll()
        .subscribe({
          next: (data) => {
            console.log("data getClientes: \n", data);
            this.clienteService.setClientes(data)
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

  getTiposCliente():void {
    this.tiposClienteAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data tiposCliente: \n", data);
        this.clienteService.tiposCliente = data;
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
    this.subscriptionClientes$ = this.clienteService.clientes$
      .subscribe(data => {
        // Cada vez que el observable emita un valor, se ejecutará este código
        this.clientes = [...data]
        console.log("Clientes del observable ese en ClientePrivado: ",data);
      });

    this.getClientes();
    this.getTiposCliente();

  }

  ngOnDestroy(): void {
    this.subscriptionClientes$.unsubscribe();
  }

}


/*
  clientes:Cliente[];

  dialogDetalleRef:MatDialogRef<DetalleClienteModalComponent>;

  columns:ColumnTableInfoDefinition[] = [
    {
      title: "Nombre",
      field: "nombre",
      getter: (cliente:Cliente) => {
        return cliente.nombre+" "+cliente.apellido
      }
    },
    {
      title: "Teléfono",
      field: "telefono",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Tipo cliente",
      field: "tipoCliente",
      getter: (cliente:Cliente) => {
        return cliente.tipoCliente?.nombre
      }
    }
  ];




  loading:boolean = false;
  errorMessage:string;

  showModal:boolean =  false;
  modalStyles:Object = {
    width: '80%',
    maxHeight: '80%',
    border: "2px solid black",
    borderRadius: "2px"
  }

  showDetails(id:number, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const clienteParaDetalle = this.clientes.find(cliente => cliente.id == id);

    this.dialogDetalleRef = this.dialog.open(DetalleClienteModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration,
      exitAnimationDuration,
      autoFocus: false,
      data: clienteParaDetalle
    });

    this.dialogDetalleRef.afterClosed().subscribe(() => this.getClientes())
  }


  getClientes():void {
      this.loading = true;  
      this.clientesAPI.getAll()
        .subscribe({
          next: (data) => {
            console.log("data getClientes: \n", data);
            this.clientes = data;
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
    private clientesAPI:ClientesApiService,
    private dialog: MatDialog
  ) {}
 
  ngOnInit() {
    this.getClientes();


  }
*/