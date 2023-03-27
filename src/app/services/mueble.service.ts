import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetalleMuebleModalComponent } from 'src/app/components/detalle-mueble/detalle-mueble-modal/detalle-mueble-modal.component';
import { Mueble, Modelo, Color, Estado } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { ColoresApiService } from './api/colores-api.service';
import { EstadosApiService } from './api/estados-api.service';
import { ModelosApiService } from './api/modelos-api.service';

@Injectable({
  providedIn: 'root'
})
export class MuebleService {
  private _modalRef:MatDialogRef<DetalleMuebleModalComponent>

  private _muebles:Mueble[];
  private muebles = new BehaviorSubject<Mueble[]>(null);
  public muebles$ = this.muebles.asObservable();

  private _muebleParaDetalle:Mueble;
  private muebleParaDetalle = new BehaviorSubject<Mueble>({});
  public muebleParaDetalle$ = this.muebleParaDetalle.asObservable();
  
  private _modelos:Modelo[];   
  private modelos = new BehaviorSubject<Modelo[]>([]);
  public modelos$ = this.modelos.asObservable();
 
  private _colores:Color[];  
  private colores = new BehaviorSubject<Color[]>([]);
  public colores$ = this.colores.asObservable();

  private _estados:Estado[];
  private estados = new BehaviorSubject<Estado[]>([]);
  public estados$ = this.estados.asObservable();


  //** Constructor **//
  //** Constructor **//
  constructor(
    private mueblesAPI:MueblesApiService,
    private coloresAPI:ColoresApiService,
    private modelosAPI:ModelosApiService,
    private estadosAPI:EstadosApiService) { }


  //** Métodos **//
  //** Métodos **//

  // Muebles
  setMuebles(muebles:Mueble[]):void {
    this._muebles = [...muebles]

    this.muebles.next(this._muebles)
  }
  updateMueble(mueble:Mueble):void {
    let ix:number = this._muebles.findIndex(mueb => mueb.id === mueble.id)
    let mueblesActualizado = [...this._muebles]
    mueblesActualizado.splice(ix, 1, mueble)
    this._muebles = mueblesActualizado
    this.muebles.next(this._muebles)
  }
  deleteMueble(idPedido:number):void {
    let ix:number = this._muebles.findIndex(cl => cl.id === idPedido)
    let mueblesActualizado = [...this._muebles]
    mueblesActualizado.splice(ix, 1)
    this._muebles = mueblesActualizado
    this.muebles.next(this._muebles)
  }  

  getMuebles():any {
    
    return new Promise((resolve, reject)=>{

      this.mueblesAPI.getAll()
        .subscribe({
          next: (data) => {
            // console.log("data getMuebles: \n", data);
            this.setMuebles(data)
            this.setMuebleParaDetalle(this.getMuebleParaDetalle()?.id)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos de los Muebles"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Muebles"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }

  // Mueble para detalle
  setMuebleParaDetalle(idMueble:number):void {
    idMueble
      ? this._muebleParaDetalle = this._muebles.find(mue => mue.id === idMueble)
      : null

    this.muebleParaDetalle.next(this._muebleParaDetalle)
  }
  getMuebleParaDetalle():Mueble {
    return this._muebleParaDetalle
  }


  // Colores
  setColores(colores:Color[]):void {
    this._colores = [...colores]

    this.colores.next(this._colores)
  }

  getColores():any {
    
    return new Promise((resolve, reject)=>{

      this.coloresAPI.getAll()
        .subscribe({
          next: (data) => {
            // console.log("data getColores: \n", data);
            this.setColores(data)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos de los Colores"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Colores"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }

  // Modelos
  setModelos(modelos:Modelo[]):void {
    this._modelos = [...modelos]

    this.modelos.next(this._modelos)
  }

  getModelos():any {
    
    return new Promise((resolve, reject)=>{

      this.modelosAPI.getAll()
        .subscribe({
          next: (data) => {
            // console.log("data getModelos: \n", data);
            this.setModelos(data)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos de los Modelos"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Modelos"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }

  // Estados
  setEstados(estados:Estado[]):void {
    this._estados = [...estados]

    this.estados.next(this._estados)
  }

  getEstados():any {
    
    return new Promise((resolve, reject)=>{

      this.estadosAPI.getAll()
        .subscribe({
          next: (data) => {
            // console.log("data getEstados: \n", data);
            this.setEstados(data)
            resolve({ok: true})
          },
          error: (err) => {
            console.log("err \n", err)
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando traer los datos de los Estados"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Lo siento hubo un problema en el servidor intentando traer los datos de los Estados"
            reject({ok: false, error: err, message: errorMessage})
          }        
        })
    })
  }

  public get modalRef():MatDialogRef<DetalleMuebleModalComponent> {
    return this._modalRef
  }  
  public set modalRef(ref:MatDialogRef<DetalleMuebleModalComponent>) {
    this._modalRef = ref;
  }

}
