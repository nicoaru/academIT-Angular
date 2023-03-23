import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Cliente, Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { getLocaleDateStringFromUnixTime } from 'src/app/utils/utils';
import { DetalleMuebleModalComponent } from 'src/app/components/detalle-mueble/detalle-mueble-modal/detalle-mueble-modal.component';
import { Subscription } from 'rxjs';
import { ColoresApiService } from 'src/app/services/api/colores-api.service';
import { EstadosApiService } from 'src/app/services/api/estados-api.service';
import { ModelosApiService } from 'src/app/services/api/modelos-api.service';
import { MuebleService } from '../../../services/mueble.service';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-muebles-privado',
  templateUrl: './muebles-privado.component.html',
  styleUrls: ['./muebles-privado.component.css']
})
export class MueblesPrivadoComponent {
   columns:ColumnTableInfoDefinition[] = [
    {
      title: "N°",
      field: "id"
    },
    {
      title: "Entrega",
      field: "entrega",
      getter: (mueble:Mueble) => {
        return new Date(mueble.pedido?.fechaEntrega).toLocaleDateString();
      }
    },
    {
      title: "Cant",
      field: "cantidad",
    },
    {
      title: "Modelo",
      field: "modelo",
      getter: (mueble:Mueble) => {
        return mueble.modelo?.nombre
      }
    },
    {
      title: "Medidas",
      field: "medidas",
      getter: (mueble:Mueble) => {
        return mueble.largo+' x '+mueble.alto+' x '+mueble.profundidad
      }
    },
    {
      title: "Color",
      field: "color",
      getter: (mueble:Mueble) => {
        return mueble.color?.nombre
      }
    },
    {
      title: "Estado",
      field: "estado",
      getter: (mueble:Mueble) => {
        return mueble.estado?.nombre
      }
    },
    {
      title: "Cliente",
      field: "cliente",
      getter: (mueble:Mueble) => {
        return mueble.pedido?.cliente?.nombre+' '+mueble.pedido?.cliente?.apellido
      }
    },
    {
      title: "Pedido",
      field: "pedido",
      getter: (mueble:Mueble) => {
        return mueble.pedido?.id
      }
    }
  ]; 
  dialogDetalleRef:MatDialogRef<DetalleMuebleModalComponent>;
  
  private subscriptionMuebles$:Subscription;  
  muebles:Mueble[];

  loading:boolean = false;
  errorMessage:string;
  showModal:boolean =  false;




  //** Constructor **//
  //** Constructor **//
  constructor(
    private mueblesAPI:MueblesApiService,
    private modelosAPI:ModelosApiService,
    private coloresAPI:ColoresApiService,
    private estadosAPI:EstadosApiService,
    private muebleService:MuebleService,
    private dialog: MatDialog
  ) {}





  //** Métodos **//
  //** Métodos **//
  showDetails(id:number): void {
    const muebleParaDetalle = this.muebles.find(mueble => mueble.id === id);
    this.muebleService.setMuebleParaDetalle(id);

    this.dialogDetalleRef = this.dialog.open(DetalleMuebleModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false
      //data: clienteParaDetalle
    });

  }

  deleteMueble(id:number) {
    this.mueblesAPI.deleteById(id)
      .subscribe({
        next: (data:Mueble) => {
          console.log("Mueble eliminado ok: \n", data);
          this.muebleService.deleteMueble(data.id)
        },
        error: (err) => {
          console.log("err \n", err)
          let errorMessage;
          err.status === 0
          ? errorMessage = "Lo siento tuvimos un problema intentando eliminar el mueble"
          : err.status === 401
            ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : errorMessage = "Lo siento hubo un problema en el servidor intentando eliminar el mueble"

          this.dialog.open(AlertModalComponent, { data: {message: errorMessage} })
        }
      })
  }

  async getMuebles():Promise<void> {
    this.loading = true;
    try {
      console.log("inicio")
      this.loading = true;
      let result = await this.muebleService.getMuebles()
      console.log("resultado: ", result)
    }
    catch(err) {
      console.log("Error en getMuebles:\n", err)
      this.errorMessage = err.message;

    } 
    finally{ this.loading = false; }  
  }

  getColores():void {
    this.coloresAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data colores: \n", data);
        this.muebleService.colores = data;
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

  getModelos():void {
    this.modelosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data modelos: \n", data);
        this.muebleService.modelos = data;
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

  getEstados():void {
    this.estadosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data estados: \n", data);
        this.muebleService.estados = data;
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




  ngOnInit() {
    this.subscriptionMuebles$ = this.muebleService.muebles$
      .subscribe(data => {
        // Cada vez que el observable emita un valor, se ejecutará este código
        this.muebles = [...data]
        console.log("Muebles del observable ese en MueblePrivado: ",data);
      });

    this.getMuebles();
    this.getModelos();
    this.getEstados();
    this.getColores();
  }

  ngOnDestroy(): void {
    this.subscriptionMuebles$.unsubscribe();
  }


}


/*
  getMuebles():void {
      this.loading = true;  
      this.mueblesAPI.getAll()
        .subscribe({
          next: (data:Mueble[]) => {
            console.log("data getMuebles: \n", data);
            this.muebleService.setMuebles(data)
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
*/