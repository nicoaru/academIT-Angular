import { Component, OnInit } from '@angular/core';
import { ColumnTableInfoDefinition } from 'src/app/components/tabla-info/tabla-info.component';
import { Cliente, Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePedidoModalComponent } from 'src/app/components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { getLocaleDateStringFromUnixTime } from 'src/app/utils/utils';
import { DetalleMuebleModalComponent } from 'src/app/components/detalle-mueble/detalle-mueble-modal/detalle-mueble-modal.component';

@Component({
  selector: 'app-muebles-privado',
  templateUrl: './muebles-privado.component.html',
  styleUrls: ['./muebles-privado.component.css']
})
export class MueblesPrivadoComponent {
  dialogDetalleRef:MatDialogRef<DetalleMuebleModalComponent>;

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

  muebles:Mueble[];


  loading:boolean = false;
  errorMessage:string;

  showModal:boolean =  false;

  showDetails(id:number): void {
    const muebleParaDetalle = this.muebles.find(mueble => mueble.id === id);
    console.log("mueble que recupera el showDetails:\n", muebleParaDetalle)
    this.dialogDetalleRef = this.dialog.open(DetalleMuebleModalComponent, {
      width: '80%',
      maxHeight: '80%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      autoFocus: false,
      data: muebleParaDetalle
    });

    this.dialogDetalleRef.afterClosed().subscribe(() => this.getMuebles())
}


getMuebles():void {
    this.loading = true;  
    this.mueblesAPI.getAll()
      .subscribe({
        next: (data:Mueble[]) => {
          console.log("data: \n", data);
          this.muebles = data;
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
    private mueblesAPI:MueblesApiService,
    private dialog: MatDialog
  ) {}
 
  ngOnInit() {
    this.getMuebles();

  }


}
