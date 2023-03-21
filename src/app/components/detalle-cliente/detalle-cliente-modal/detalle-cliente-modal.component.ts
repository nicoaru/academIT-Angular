import { Component, Inject } from '@angular/core';
import { Cliente, Mueble, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleClienteServiceService } from '../detalle-cliente-service.service';


//***** *****//

@Component({
  selector: 'app-detalle-cliente-modal',
  templateUrl: './detalle-cliente-modal.component.html',
  styleUrls: ['./detalle-cliente-modal.component.css']
})
export class DetalleClienteModalComponent {
  cliente:Cliente;
  //muebles:Mueble[];
  tiposCliente:TipoCliente[];  


  modalRef:MatDialogRef<DetalleClienteModalComponent>;
  








  //** Para traer datos del back **/
  getTiposCliente():void {
    this.tiposClienteAPI.getAll()
    .subscribe({
      next: (data) => {
        // console.log("data: \n", data);
        this.tiposCliente = data;
      },
      error: (err) => {
        console.log("err \n", err)
        let modalMessage:string;
        err.status === 0
          ? modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
          : err.status === 401
            ? modalMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
            : modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
      }})        
  }

  // getMueblesDelCliente():void {
  //   this.mueblesAPI.getMueblesPorIdCliente(this.cliente.id)
  //   .subscribe({
  //     next: (data) => {
  //       // console.log("data: \n", data);
  //       this.muebles = data;
  //     },
  //     error: (err) => {
  //       console.log("err \n", err)
  //       let modalMessage:string;
  //       err.status === 0
  //         ? modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
  //         : err.status === 401
  //           ? modalMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
  //           : modalMessage = "Algunos datos no llegaron bien del servidor, quizás tengas problemas para actualizar el dato Tipo de Cliente"
  //     }})        
  // }







//** Constructor & ngOnInit **/

  constructor(
    private tiposClienteAPI:TiposClienteApiService,
    private mueblesAPI:MueblesApiService,
    private detalleClienteService:DetalleClienteServiceService,
    modalRef:MatDialogRef<DetalleClienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) cliente: Cliente
  ) {
    this.cliente = cliente;
    this.modalRef = modalRef;
    detalleClienteService.modalRef = this.modalRef;
  
    // console.log("cliente en modal: \n", cliente)
  }


  ngOnInit(): void {
    this.getTiposCliente();
    //this.getMueblesDelCliente();
  }

}
