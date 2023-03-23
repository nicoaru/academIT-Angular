import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Cliente, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { ClienteService } from 'src/app/pages/privado/clientes-privado/cliente.service';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { EditNombreComponent } from '../../detalle-cliente/detalle-cliente-item-datos/detalle-cliente-edit-nombre/edit-nombre.component';

@Component({
  selector: 'app-carga-cliente',
  templateUrl: './carga-cliente.component.html',
  styleUrls: ['./carga-cliente.component.css']
})
export class CargaClienteComponent {
  cliente:Cliente
  tiposCliente:TipoCliente[];  

  editable:boolean = false;
  formDatosCliente:FormGroup;




  //** Constructor **/
  //** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private clientesAPI:ClientesApiService,
    private tiposClienteAPI:TiposClienteApiService,
    private dialogRef: MatDialogRef<CargaClienteComponent>,
  ) {
    //* creo el form
    this.formDatosCliente = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      email: ['', Validators.email],
      tipoCliente: [''],
      notas: ['']
    })

  }



  //** Métodos **//
  //** Métodos **//
  
  // toggleEdit():void {
  //   this.formDatosCliente.enabled
  //     ? this.formDatosCliente.disable()
  //     : this.formDatosCliente.enable();
  // }

  cargarCliente():void {
    try{
      // let nuevoCliente:Cliente = {...this.cliente}
      let nuevoCliente:Cliente = {};

      nuevoCliente.nombre = this.formDatosCliente.value.nombre,
      nuevoCliente.apellido = this.formDatosCliente.value.apellido,
      nuevoCliente.telefono = this.formDatosCliente.value.telefono,
      nuevoCliente.email = this.formDatosCliente.value.email,
      nuevoCliente.notas = this.formDatosCliente.value.notas,
      nuevoCliente.tipoCliente = {id: this.formDatosCliente.value.tipoCliente}
  
      console.log("Cliente a cargar: ", nuevoCliente)

      this.clientesAPI.save(nuevoCliente)
      .subscribe({
          next: (data:Cliente) => {
            console.log("Actualizado OK: ", data);
            let message = `Cliente ${data.nombre} ${data.apellido} creado con éxito`;
            //this.matDialog.open(AlertModalComponent, { data: {message}});
            this.dialogRef.close(true);

          },
          error: (err) => {
            console.log("err \n", err)
  
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Hubo un error, no pudimos cargar el nuevo cliente"
              : err.status === 401
                ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                : errorMessage = "Hubo un error con el servidor, no pudimos cargar el cliente"
  
            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
  
          }})    
  
    }
    catch(err) {
      console.log("err \n", err)

      let errorMessage:string = "Hubo un error, no pudimos cargar el nuevo cliente";

      this.matDialog.open(AlertModalComponent, { data: {message: errorMessage} })
    }

  }

  getTiposCliente():void {

    this.tiposClienteAPI.getAll()
    .subscribe({
        next: (data:TipoCliente[]) => {
          this.tiposCliente = data;
        },
        error: (err) => {
          console.log("Error trayendo los TipoCliente: \n", err)

        }})    
  
  }

  // restoreFormValues():void {
  //   this.formDatosCliente.controls['nombre'].setValue(this.cliente.nombre);
  //   this.formDatosCliente.controls['apellido'].setValue(this.cliente.apellido);
  //   this.formDatosCliente.controls['telefono'].setValue(this.cliente.telefono);
  //   this.formDatosCliente.controls['email'].setValue(this.cliente.email);
  //   this.formDatosCliente.controls['tipoCliente'].setValue(this.cliente.tipoCliente?.id);
  //   this.formDatosCliente.controls['notas'].setValue(this.cliente.notas);     
  // }

  
  //** LifeCycles **/
  //** LifeCycles **/

  ngOnInit(): void {
    this.getTiposCliente();
  }

  ngOnDestroy(): void {
  }

}
