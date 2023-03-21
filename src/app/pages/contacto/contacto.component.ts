import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  pathActual:string = document.location.pathname;

  constructor() {
    console.log(this.pathActual)
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