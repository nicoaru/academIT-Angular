import { Component, Inject } from '@angular/core';
import { Mueble } from 'src/app/models/interfaces/entidades.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MuebleService } from 'src/app/pages/privado/muebles-privado/mueble.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-mueble-modal',
  templateUrl: './detalle-mueble-modal.component.html',
  styleUrls: ['./detalle-mueble-modal.component.css']
})
export class DetalleMuebleModalComponent {
  mueble:Mueble;
  modalRef:MatDialogRef<DetalleMuebleModalComponent>;  // lo uso para pasarle la Ref a los métodos que utilizan close() y afterClosed()
  private subscribtionMueble$: Subscription;




  //** Constructor **//
  //** Constructor **//
  constructor(
    private muebleService:MuebleService,
    modalRef:MatDialogRef<DetalleMuebleModalComponent>
  ) {
    this.modalRef = modalRef;
    this.muebleService.modalRef = this.modalRef;
  
    // console.log("cliente en modal: \n", cliente)
  }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    this.subscribtionMueble$ = this.muebleService.muebleParaDetalle$
    .subscribe(data => {
      // Cada vez que el observable emita un valor, se ejecutará este código
      this.mueble = data
      console.log("Mueble para detalle: ",data);
    });
  }

  ngOnDestroy(): void {
    this.subscribtionMueble$.unsubscribe();
  }

  
}
