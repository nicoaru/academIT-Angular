import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { User } from 'src/app/models/classes/classes';
import { UserFromRequest } from 'src/app/models/interfaces/userFromRequest.interface';
import { ApiLoginService } from 'src/app/services/api/api-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFormGroup:FormGroup;

  showModal:boolean = false;
  modalMessage: string;

  showSpinner:boolean = false;


  login():any {
    
    this.showSpinner = true;

    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    let userFromRequest:UserFromRequest = {username, password};


    this.ApiLogin.login(userFromRequest)
      .subscribe({ 
        next: (data) => {
          const user:User = {id: data.id, username: data.username};
          console.log(user)
        }, 
        error: (err) => {
          console.log(err);
          let errorMessage:string;
          err.status === 0
            ? errorMessage = "Lo siento tuvimos un problema intentando hacer el login"
            : err.status === 401
              ? errorMessage = "Credenciales incorrectas"
              : errorMessage = "Lo siento hubo un problema en el servidor procesando la petición"

            this.matDialog.open(AlertModalComponent, { data: {message: errorMessage}})
            this.showSpinner = false;
          },
        complete: () => {
          this.showSpinner = false;
          console.log("Entro en complete: se ejecuta solo si fue success")
        }
        }
      )
    
     
  }





  constructor(
    private ApiLogin:ApiLoginService, 
    private formBuilder:FormBuilder,
    private matDialog:MatDialog
  ) {
      this.loginFormGroup = this.formBuilder.group({
        username: [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        password: [
          '',
          Validators.compose([
            Validators.required
          ])
        ]
      });
    }





}


/*
// elementos del DOM
const loginButton = document.getElementById('loginButton')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')

const logoutButton = document.getElementById('logoutButton')
console.log("logoutButton: ", logoutButton)

// Login //

const login = async(username, password) => {
  let userRequest = {username, password}
  let user;

  if(!username || !password) {
      showModal("Faltan datos")
      return
  }

  API.login(userRequest)
  .then(data => {
      user = data;
      console.log({user})
      
      sessionStorage.setItem('username', user.username);
      location.assign("index.html")
      
  })
  .catch(err => {
      if(err.statusCode === 401) {
          console.log('No autorizado: ', err)            
          showModal("No autorizado")
      }
      else if (err.statusCode){
          console.log("Hubo un problema en el servidor: ", err)
          showModal("Hubo un problema en el servidor")
      }
      else {
          console.log("Tuvimos un problema: ", err)
          showModal("Tuvimos un problema. Lo siento")
      }
  })
 
}

if(loginButton) {
  loginButton.onclick = (event) => {
      event.preventDefault();
      const usernameValue = usernameInput.value;
      const passwordValue = passwordInput.value;
      login(usernameValue, passwordValue);
  }   
}


// Logout //

const logout = () => {
  sessionStorage.removeItem('username');
  location.assign("../../index.html")    
     
}

if(logoutButton) {
  logoutButton.onclick = (event) => {
      event.preventDefault();
      logout();
  }
}
*/