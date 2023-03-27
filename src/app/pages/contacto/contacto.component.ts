import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { Consulta } from 'src/app/models/classes/consulta.class';
import { ConsultasApiService } from 'src/app/services/api/consultas-api.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
    consulta:Consulta = new Consulta();

  //** Contructos **//
  //** Contructos **//
  constructor(
    private consultasAPI:ConsultasApiService,
    private dialogMat:MatDialog) {
  }

  //** Métodos **//
  //** Métodos **//
  enviarConsulta(formConsulta:NgForm) {
    console.log("Consulta a enviar: ", this.consulta)

    this.consultasAPI.send(this.consulta)
        .subscribe({
            next: (data:Consulta) => {
                console.log("Consulta enviada con éxito: ", data)
                let message:string = "Consulta enviada con éxito. Nos comunicaremos a la brevedad"
                this.dialogMat.open(AlertModalComponent, { data: {message} });
                formConsulta.reset();
                this.consulta = new Consulta();

            },
            error: (err) => {
                console.log("err \n", err)
                let errorMessage:string;
                err.status === 0
                ? errorMessage = "Lo siento tuvimos un problema intentando enviar la consulta"
                : err.status === 401
                  ? errorMessage = "Mmm.. pareciera que no estás autorizadoa a ver esto... 🤔"
                  : errorMessage = "Lo siento hubo un problema en el servidor intentando enviar la consulta"
      
                this.dialogMat.open(AlertModalComponent, { data: {message: errorMessage} })
              }
        })
    }

}