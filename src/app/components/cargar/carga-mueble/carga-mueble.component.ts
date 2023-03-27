import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente, Color, Estado, Modelo, Mueble, Pedido, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { ColoresApiService } from 'src/app/services/api/colores-api.service';
import { EstadosApiService } from 'src/app/services/api/estados-api.service';
import { ModelosApiService } from 'src/app/services/api/modelos-api.service';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { EditNombreComponent } from '../../detalle-cliente/detalle-cliente-item-datos/detalle-cliente-edit-nombre/edit-nombre.component';

@Component({
  selector: 'app-carga-mueble',
  templateUrl: './carga-mueble.component.html',
  styleUrls: ['./carga-mueble.component.css', '../../../styles/form-control.css']
})
export class CargaMuebleComponent {
  @Output() onPrecargarAlPedido = new EventEmitter<Mueble>();
  @Output() onEliminarMueblePedidoNuevo = new EventEmitter<null>();
  @Input() mueblePedidoNuevo:Mueble;
  disabled:boolean = false;
  pedido:Pedido;
  colores:Color[];
  modelos:Modelo[];
  estados:Estado[];

  editable:boolean = false;
  formDatosMueble:FormGroup;




  //** Constructor **/
  //** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private mueblesAPI:MueblesApiService,
    private coloresAPI:ColoresApiService,
    private estadosAPI:EstadosApiService,
    private modelosAPI:ModelosApiService,
    private dialogRef: MatDialogRef<CargaMuebleComponent>,
    @Inject(MAT_DIALOG_DATA) data:any
  ) {
    //* creo el form
    this.formDatosMueble = this.formBuilder.group({
      largo: ['', Validators.min(0)],
      alto: ['', Validators.min(0)],
      profundidad: ['', Validators.min(0)],
      cantidad: ['', Validators.min(0)],
      color: [''],
      modelo: ['', Validators.required],
      notas: [''],
      estado: ['']
    });

    this.pedido = data?.pedido;
    console.log("Pedido en cargar mueble: \n", this.pedido)
  }



  //** Métodos **//
  //** Métodos **//
  
  toggleEdit():void {
    this.formDatosMueble.enabled
      ? (this.formDatosMueble.disable(), this.disabled = true)
      : (this.formDatosMueble.enable(), this.disabled = false);
  }

  cargarMueble():void {
    try{
      // let nuevoMueble:Mueble = {...this.mueble}
      let nuevoMueble:Mueble = {};
      nuevoMueble.largo = this.formDatosMueble.controls['largo'].value;
      nuevoMueble.alto = this.formDatosMueble.controls['alto'].value;
      nuevoMueble.profundidad = this.formDatosMueble.controls['profundidad'].value;
      nuevoMueble.cantidad = this.formDatosMueble.controls['cantidad'].value;
      nuevoMueble.color = {id: this.formDatosMueble.controls['color'].value};
      nuevoMueble.modelo = {id: this.formDatosMueble.controls['modelo'].value};
      nuevoMueble.estado = {id: this.formDatosMueble.controls['estado'].value};
      nuevoMueble.notas = this.formDatosMueble.controls['notas'].value;
      nuevoMueble.pedido = this.pedido;

      console.log("Mueble que se va a cargar: ", nuevoMueble)

      this.mueblesAPI.save(nuevoMueble)
      .subscribe({
          next: (data:Mueble) => {
            console.log("Actualizado OK: ", data);
            // this.matDialog.open(AlertModalComponent, { data: {message}});
            this.dialogRef.close(true);

          },
          error: (err) => {
            console.log("err \n", err)
  
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Hubo un error, no pudimos cargar el nuevo mueble"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Hubo un error con el servidor, no pudimos cargar el nuevo mueble"
  
            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
  
          }})    
  
    }
    catch(err) {
      console.log("err \n", err)

      let errorMessage:string = "Hubo un error, no pudimos cargar el nuevo mueble";

      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage} })
    }

  }

  precargarAlPedido():void {
    // let nuevoMueble:Mueble = {...this.mueble}
    let nuevoMueble:Mueble = {};
    nuevoMueble.largo = this.formDatosMueble.controls['largo'].value;
    nuevoMueble.alto = this.formDatosMueble.controls['alto'].value;
    nuevoMueble.profundidad = this.formDatosMueble.controls['profundidad'].value;
    nuevoMueble.cantidad = this.formDatosMueble.controls['cantidad'].value;
    nuevoMueble.color = {id: this.formDatosMueble.controls['color'].value};
    nuevoMueble.modelo = {id: this.formDatosMueble.controls['modelo'].value};
    nuevoMueble.estado = {id: this.formDatosMueble.controls['estado'].value};
    nuevoMueble.notas = this.formDatosMueble.controls['notas'].value;

    console.log("se ejecuto blur")
    this.onPrecargarAlPedido.emit(nuevoMueble);
  }

  eliminarMueblePedidoNuevo():void {
    this.onEliminarMueblePedidoNuevo.emit()
  }

  getColores():void {
    this.coloresAPI.getAll()
    .subscribe({
        next: (data:Color[]) => {
          this.colores = data;
        },
        error: (err) => {
          console.log("Error trayendo los Colores: \n", err)

        }})    
  }

  getModelos():void {
    this.modelosAPI.getAll()
    .subscribe({
        next: (data:Color[]) => {
          this.modelos = data;
        },
        error: (err) => {
          console.log("Error trayendo los Modelos: \n", err)

        }})    
  }

  getEstados():void {
    this.estadosAPI.getAll()
    .subscribe({
        next: (data:Color[]) => {
          this.estados = data;
        },
        error: (err) => {
          console.log("Error trayendo los Estados: \n", err)

        }})    
  }

  initializeForm():void {
    this.formDatosMueble.controls['largo'].setValue(this.mueblePedidoNuevo.largo);
    this.formDatosMueble.controls['alto'].setValue(this.mueblePedidoNuevo.alto);
    this.formDatosMueble.controls['profundidad'].setValue(this.mueblePedidoNuevo.profundidad);
    this.formDatosMueble.controls['cantidad'].setValue(this.mueblePedidoNuevo.cantidad);
    this.formDatosMueble.controls['color'].setValue(this.mueblePedidoNuevo.color?.id);
    this.formDatosMueble.controls['modelo'].setValue(this.mueblePedidoNuevo.modelo?.id);
    this.formDatosMueble.controls['notas'].setValue(this.mueblePedidoNuevo.notas);
    this.formDatosMueble.controls['estado'].setValue(this.mueblePedidoNuevo.estado?.id);
  }

  esMuebleNuevo(mueble:Mueble):boolean {
    let esNuevo = Object.keys(this.mueblePedidoNuevo).length === 0;
    console.log("es nuevo: ", esNuevo);
    return esNuevo;    
  }

  
  //** LifeCycles **/
  //** LifeCycles **/

  ngOnInit(): void {
    console.log("mueblePedidoNuevo: \n", this.mueblePedidoNuevo)
    if(this.mueblePedidoNuevo) this.initializeForm(); //esto lo hago porque cda vez que se actualiza el array de muebles en cargaPedido se renderiza de nuevo este componenete
    this.mueblePedidoNuevo && !this.esMuebleNuevo(this.mueblePedidoNuevo)
      ? (this.formDatosMueble.disable(), this.disabled = true)
      : null



    this.getColores();
    this.getEstados();
    this.getModelos();


  }

  ngOnDestroy(): void {
  }

}
