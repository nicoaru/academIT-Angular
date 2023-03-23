import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { CargaClienteComponent } from 'src/app/components/cargar/carga-cliente/carga-cliente.component';
import { CargaMuebleComponent } from 'src/app/components/cargar/carga-mueble/carga-mueble.component';
import { CargaPedidoComponent } from 'src/app/components/cargar/carga-pedido/carga-pedido.component';

@Component({
  selector: 'app-cargar-privado',
  templateUrl: './cargar-privado.component.html',
  styleUrls: ['./cargar-privado.component.css']
})
export class CargarPrivadoComponent {

  //** Constructor **//
  //** Constructor **//
  constructor(
    private dialog:MatDialog) { }

  //** Métodos **//
  //** Métodos **//
  cargarCliente():void {
    let dialogCargarClienteRef = this.dialog.open(CargaClienteComponent, {
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      autoFocus: false
    });
    dialogCargarClienteRef.beforeClosed()
      .subscribe(seCreoCliente => {
        if(seCreoCliente) this.dialog.open(AlertModalComponent, { data: {message: 'Cliente creado con éxito'}})
      })
  }



  //** LifeCycles **//
  //** LifeCycles **//

}
