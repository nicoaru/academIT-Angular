import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { User } from 'src/app/models/classes/classes';
import { UserFromRequest } from 'src/app/models/interfaces/userFromRequest.interface';
import { SessionApiService } from 'src/app/services/api/session-api.service';


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



  //** Constructor **//
  //** Constructor **//
  constructor(
    private sessionAPI:SessionApiService, 
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




  //** Métodos **//
  //** Métodos **//
  login():any {
    this.showSpinner = true;

    let username = this.loginFormGroup.value.username;
    let password = this.loginFormGroup.value.password;
    let userFromRequest:UserFromRequest = {username, password};

    this.sessionAPI.login(userFromRequest)
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

}