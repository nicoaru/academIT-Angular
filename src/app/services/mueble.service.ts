import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DetalleMuebleModalComponent } from 'src/app/components/detalle-mueble/detalle-mueble-modal/detalle-mueble-modal.component';
import { Mueble, Modelo, Color, Estado } from 'src/app/models/interfaces/entidades.interfaces';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';

@Injectable({
  providedIn: 'root'
})
export class MuebleService {
  private _modalRef:MatDialogRef<DetalleMuebleModalComponent>

  private _muebles:Mueble[];
  private muebles = new BehaviorSubject<Mueble[]>([]);
  public muebles$ = this.muebles.asObservable();

  private _muebleParaDetalle:Mueble;
  private muebleParaDetalle = new BehaviorSubject<Mueble>({});
  public muebleParaDetalle$ = this.muebleParaDetalle.asObservable();

  private _modelos:Modelo[];  
  private _colores:Color[];
  private _estados:Estado[];


  //** Constructor **//
  //** Constructor **//
  constructor(private mueblesAPI:MueblesApiService) { }


  //** Métodos **//
  //** Métodos **//
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
            console.log("data getMuebles: \n", data);
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

  
  setMuebleParaDetalle(idMueble:number):void {
    this._muebleParaDetalle = this._muebles.find(mue => mue.id === idMueble);

    this.muebleParaDetalle.next(this._muebleParaDetalle)
  }
  getMuebleParaDetalle():Mueble {
    return this._muebleParaDetalle
  }



  public get modelos():Modelo[] {
    return this._modelos
  }
  public set modelos(modelos:Modelo[]) {
    this._modelos = modelos;
  }

  public get colores():Color[] {
    return this._colores
  }
  public set colores(colores:Color[]) {
    this._colores = colores;
  }

  public get estados():Estado[] {
    return this._estados
  }
  public set estados(estados:Estado[]) {
    this._estados = estados;
  }


  public get modalRef():MatDialogRef<DetalleMuebleModalComponent> {
    return this._modalRef
  }  
  public set modalRef(ref:MatDialogRef<DetalleMuebleModalComponent>) {
    this._modalRef = ref;
  }

}
