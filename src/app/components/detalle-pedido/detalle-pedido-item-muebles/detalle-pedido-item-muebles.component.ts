import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { PedidoService } from 'src/app/services/pedido.service';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { DetallePedidoService } from '../detalle-pedido.service';

@Component({
  selector: 'app-detalle-pedido-item-muebles',
  templateUrl: './detalle-pedido-item-muebles.component.html',
  styleUrls: ['./detalle-pedido-item-muebles.component.css']
})
export class DetallePedidoItemMueblesComponent implements OnInit {
  muebles:Mueble[];
  private subscribtionPedido$: Subscription;




  //** Constructor **//
  //** Constructor **//
 constructor(
  private mueblesAPI:MueblesApiService,
  private pedidoService:PedidoService,
  private dialog: MatDialog) {}



 
  //** Métodos **//
  //** Métodos **//

  deleteMueble(id:number) {
    this.mueblesAPI.deleteById(id)
      .subscribe({
        next: (data:Mueble) => {
          console.log("Mueble eliminado ok: \n", data);
          // this.pedidoService.deletePedido(data.id
          this.pedidoService.getPedidos()
            .catch((err)=>{
              let errorMessage:string = "El mueble se eliminó correctamente, pero hubo un problema con el servidor luego...";
              this.dialog.open(AlertModalComponent, { data: {message: errorMessage} })
            })
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



  closeModal():void {
    this.pedidoService.modalRef.close();
 }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    this.subscribtionPedido$ = this.pedidoService.pedidoParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.muebles = data.muebles;
      console.log("Muebles de Pedido para detalle: ",this.muebles);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionPedido$.unsubscribe();
  }




}