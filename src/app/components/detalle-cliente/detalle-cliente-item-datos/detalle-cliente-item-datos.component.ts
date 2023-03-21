import { Component, Input, OnInit } from '@angular/core';
import { Cliente, Mueble, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditNombreComponent } from './detalle-cliente-edit-nombre/edit-nombre.component';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';

@Component({
  selector: 'app-detalle-cliente-item-datos',
  templateUrl: './detalle-cliente-item-datos.component.html',
  styleUrls: ['./detalle-cliente-item-datos.component.css']
})
export class DetalleClienteItemDatosComponent implements OnInit {
  @Input() cliente:Cliente
  @Input() tiposCliente:TipoCliente[];  

  editable:boolean = false;
  formDatosCliente:FormGroup;
  dialogEditNombreRef:MatDialogRef<EditNombreComponent>;

  toggleEdit():void {
    this.formDatosCliente.enabled
      ? this.formDatosCliente.disable()
      : this.formDatosCliente.enable();
  }

  showModalEditNombre():void {
    this.dialogEditNombreRef = this.matDialog.open(EditNombreComponent, {
      data: { nombre: this.formDatosCliente.value.nombre, apellido: this.formDatosCliente.value.apellido }
    })
    this.dialogEditNombreRef.afterClosed().subscribe(data => {
      if(data) {
        this.formDatosCliente.controls['nombre'].setValue(data.nombre);
        this.formDatosCliente.controls['apellido'].setValue(data.apellido);        
      }
    })

  }

  saveChanges():void {
    let updatedCliente:Cliente = {...this.cliente}

    updatedCliente.nombre = this.formDatosCliente.value.nombre,
    updatedCliente.apellido = this.formDatosCliente.value.apellido,
    updatedCliente.telefono = this.formDatosCliente.value.telefono,
    updatedCliente.email = this.formDatosCliente.value.email,
    updatedCliente.notas = this.formDatosCliente.value.notas,
    updatedCliente.tipoCliente = {id: this.formDatosCliente.value.tipoCliente}

    console.log("clienteActualizado: ", updatedCliente)
    this.clientesAPI.updateById(this.cliente.id, updatedCliente)
    .subscribe({
        next: (data) => {
          console.log("Cliente actualizado: ", data);
          this.cliente = updatedCliente;
        },
        error: (err) => {
          console.log("err \n", err)
          //** Restaura los datos del formulario
          this.formDatosCliente.controls['nombre'].setValue(this.cliente.nombre);
          this.formDatosCliente.controls['apellido'].setValue(this.cliente.apellido);
          this.formDatosCliente.controls['telefono'].setValue(this.cliente.telefono);
          this.formDatosCliente.controls['email'].setValue(this.cliente.email);
          this.formDatosCliente.controls['tipoCliente'].setValue(this.cliente.tipoCliente?.id);
          this.formDatosCliente.controls['notas'].setValue(this.cliente.notas);  

          let errorMessage:string;
          err.status === 0
            ? errorMessage = "Hubo un error, no pudimos actualizar los datos del cliente"
            : err.status === 401
              ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
              : errorMessage = "Hubo un error con el servidor, no pudimos actualizar los datos del cliente"

          this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})

        }})    
    
    this.toggleEdit();   

  }

  cancelChanges():void {

    this.formDatosCliente.controls['nombre'].setValue(this.cliente.nombre);
    this.formDatosCliente.controls['apellido'].setValue(this.cliente.apellido);
    this.formDatosCliente.controls['telefono'].setValue(this.cliente.telefono);
    this.formDatosCliente.controls['email'].setValue(this.cliente.email);
    this.formDatosCliente.controls['tipoCliente'].setValue(this.cliente.tipoCliente?.id);
    this.formDatosCliente.controls['notas'].setValue(this.cliente.notas);

    this.toggleEdit();
  }


//** Constructor **/
  constructor(
    private formBuilder:FormBuilder,
    private matDialog: MatDialog,
    private clientesAPI:ClientesApiService
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
    //* set disable
    this.formDatosCliente.disable();

    this.formDatosCliente.controls['email'].errors && this.formDatosCliente.controls['email'].errors['email']

  }

//** ngOnInit **/
  ngOnInit(): void {
    this.formDatosCliente.controls['nombre'].setValue(this.cliente.nombre);
    this.formDatosCliente.controls['apellido'].setValue(this.cliente.apellido);
    this.formDatosCliente.controls['telefono'].setValue(this.cliente.telefono);
    this.formDatosCliente.controls['email'].setValue(this.cliente.email);
    this.formDatosCliente.controls['tipoCliente'].setValue(this.cliente.tipoCliente?.id);
    this.formDatosCliente.controls['notas'].setValue(this.cliente.notas);       
  }


}
