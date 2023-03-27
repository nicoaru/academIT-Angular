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
import { ActivatedRoute } from '@angular/router';

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
  private subscriptionId$:Subscription;  
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
    private dialog:MatDialog,
    private route:ActivatedRoute
  ) {}





  //** Métodos **//
  //** Métodos **//
  showDetails(id:number): void {
    const muebleParaDetalle = this.muebles.find(mueble => mueble.id === id);
    this.muebleService.setMuebleParaDetalle(id);
    
    this.dialogDetalleRef = this.dialog.open(DetalleMuebleModalComponent, {
      width: '80%',
      height: '90%',
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
        let errorMessage:string;
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
      this.loading = true;
      let result = await this.muebleService.getMuebles()
    }
    catch(err) {
      console.log("Error en getMuebles:\n", err)
      this.errorMessage = err.message;
      
    } 
    finally{ this.loading = false; }  
  }
  
  async getColores():Promise<void> {
    try {
      let result = await this.muebleService.getColores()
      // console.log("resultado getColores: ", result)
    }
    catch(err) {
      console.log("Error en getColores:\n", err)
      this.errorMessage = err.message;
    }
    console.log("terminó get");
  }
  
  async getModelos():Promise<void> {
    try {
      let result = await this.muebleService.getModelos()
      // console.log("resultado getModelos: ", result)
    }
    catch(err) {
      console.log("Error en getModelos:\n", err)
      this.errorMessage = err.message;
    }       
    console.log("terminó get");
  }
    
  async getEstados():Promise<void> {
    try {
      let result = await this.muebleService.getEstados()
      // console.log("resultado getEstados: ", result)
    }
    catch(err) {
      console.log("Error en getEstados:\n", err)
      this.errorMessage = err.message;
    }       
    console.log("terminó get");
  }
        
        
        
        
  //** LifeCycles **//
  //** LifeCycles **//

  async ngOnInit() {
    this.subscriptionMuebles$ = this.muebleService.muebles$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.muebles = [...data]
      // console.log("Muebles del observable ese en MueblePrivado: ",data);
    });
  
    await this.getMuebles();
    await this.getModelos();
    await this.getEstados();
    await this.getColores();
  
    this.subscriptionId$ = this.route.paramMap
      .subscribe(data => {
        let id = data.get('id');
        console.log("Id mueble por parámetro: ", id)
        if(Number(id)) {
          this.showDetails(Number(id))
        }
      })

  }
  
  ngOnDestroy(): void {
    this.subscriptionMuebles$.unsubscribe();
    this.subscriptionId$.unsubscribe();
  }
  

}


/*
  getColores():void {
    this.coloresAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data colores: \n", data);
        this.muebleService.setColores(data);
      },
    error: (err) => {
      console.log("err trayendo los colores \n", err)
    }})        
  }
  
  getModelos():void {
    this.modelosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data modelos: \n", data);
        this.muebleService.setModelos(data);
      },
      error: (err) => {
        console.log("err trayendo los modelos \n", err)

      }})        
  }
    
  getEstados():void {
    this.estadosAPI.getAll()
    .subscribe({
      next: (data) => {
        console.log("data estados: \n", data);
        this.muebleService.setEstados(data);
      },
      error: (err) => {
        console.log("err trayendo los estados \n", err)

      }})        
  }
*/