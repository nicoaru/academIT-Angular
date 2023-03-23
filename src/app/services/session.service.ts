import { Injectable } from '@angular/core';
import { Usuario } from '../models/interfaces/entidades.interfaces';
import { SessionApiService } from './api/session-api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _isLogged:boolean;
  private _usuario:Usuario



  //** Constructor **//
  //** Constructor **//

  constructor(
    private sessionAPI:SessionApiService
  ) { }


  //** Métodos **//
  //** Métodos **//
  
  login(userToValidate:Usuario) {
    return new Promise((resolve, reject) => {
      this.sessionAPI.login(userToValidate)
        .subscribe({ 
          next: (data) => {        
            this.isLogged = true;
            this.usuario = data
            
            resolve({isLogged: this.isLogged, usuario: this.usuario})
          }, 
          error: (err) => {
            let errorMessage:string;
            err.status === 0
              ? errorMessage = "Lo siento tuvimos un problema intentando hacer el login"
              : err.status === 401
                ? errorMessage = "Credenciales incorrectas"
                : errorMessage = "Lo siento hubo un problema en el servidor procesando la petición"
            
              reject({error: err, message: errorMessage, isLogged: this.isLogged, usuario: this.usuario})
            }
          }
        )
    })
  }

  logout():Promise<object> {
    return new Promise((resolve, reject) => {
      try {
        this.isLogged = false;
        this.usuario = null;
        resolve({isLogged: this.isLogged, usuario: this.usuario})
      }
      catch {
        const errorMessage = "No se pudo desloggear"
        reject({error: null, message: errorMessage})
      }
    })
  }
  
  
  
  
  //** Getters & Setters **//
  //** Getters & Setters **//

  public get isLogged():boolean {
    return this._isLogged
  }  
  public set isLogged(logged:boolean) {
    this._isLogged = logged;
  }
  
  public get usuario():Usuario {
    return this._usuario
  }  
  public set usuario(user:Usuario) {
    this._usuario = user;
  }

}