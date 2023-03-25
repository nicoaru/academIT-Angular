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
    // let consulta = new Consulta();
    // consulta.nombre = formConsulta.form.value['nombre'];
    // consulta.telefono = formConsulta.form.value['telefono'];
    // consulta.textoConsulta = formConsulta.form.value['textoConsulta'];

    console.log("Consulta a enviar: ", this.consulta)

    this.consultasAPI.send(this.consulta)
        .subscribe({
            next: (data:Consulta) => {
                console.log("Consulta enviada con éxito: ", data)
                let message:string = "Consulta enviada con éxito. Nos comunicaremos a la brevedad"
                this.dialogMat.open(AlertModalComponent, { data: {message} });
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


/*

/// Formulario de contacto ///
/// Formulario de contacto ///
const urlServer = "http://localhost:8080/JavaServer-1.0-SNAPSHOT";

const formContacto = document.getElementById('formContacto')
const enviarButton = document.getElementById('enviarButton')
const nombreInput = document.getElementById('nombreInput')
const telefonoInput = document.getElementById('telefonoInput')
const textoConsultaInput = document.getElementById('textoConsultaInput')

const fetchConsulta = (consulta) => {
    return fetch(urlServer+'/api/consultas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(consulta)
    })
}

const enviarConsulta = async(nombre, telefono, textoConsulta, elementoFormulario) => {
    if(!nombre || !telefono || !textoConsulta) {
        showModal("Completar todos los campos")
        return
    }

    let consulta = {nombre, telefono, textoConsulta}

    fetchConsulta(consulta)
    .then(resp => {
        if(resp.ok) {
            console.log("Consulta enviada con éxito")
            showModal("Consulta enviada con éxito")
        }
        else {
            console.log("Hubo un error con el servidor. Intentalo de nuevo más tarde")
            elementoFormulario.reset()
        }
        elementoFormulario.reset()
    })
    .catch(err => {
        console.log("Tuvimos un error enviando tu consuta... Intentalo nuevamente más tarde")
        elementoFormulario.reset()
    })
}

enviarButton.onclick = (event) => {
    event.preventDefault();
    const nombreValue = nombreInput.value;
    const telefonoValue = telefonoInput.value;
    const textoConsultaValue = textoConsultaInput.value;
    enviarConsulta(nombreValue, telefonoValue, textoConsultaValue, formContacto);    
}



/// MODAL ///

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn= document.getElementById('closeModalBtn')

const showModal = (msg) => {
    modalBody.innerHTML = `<h4>${msg}</h4>`
    modal.dataset.show = 'true';
}

const closeModal = () => {
    modal.dataset.show = 'false';
}

closeModalBtn.onclick = closeModal;
*/