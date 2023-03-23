import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AlertModalComponent } from 'src/app/components/alert-modal/alert-modal.component';
import { Usuario } from 'src/app/models/interfaces/entidades.interfaces';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup:FormGroup;

  showModal:boolean = false;
  modalMessage: string;

  showSpinner:boolean = false;



  //** Constructor **//
  //** Constructor **//
  constructor(
    private sessionService:SessionService, 
    private router: Router,
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
  async login():Promise<void> {
    try {
      this.showSpinner = true;
      let username = this.loginFormGroup.value.username;
      let password = this.loginFormGroup.value.password;
      let userToValidate:Usuario = {username, password};

      const result:any = await this.sessionService.login(userToValidate);
      console.log("Se logge: ", result)
      this.router.navigate(['/privado'])
      }
      catch(err) {
        console.log("No se loggeo: ", err)
        this.matDialog.open(AlertModalComponent, { data: {message: err.message}})
      }
      finally {
        this.showSpinner = false;
      }
  }




  //** LifeCycles **//
  //** LifeCycles **//
  ngOnInit(): void {
    console.log("Loggeado: ", this.sessionService.isLogged)
    console.log("Usuario: ", this.sessionService.usuario)
  }

}