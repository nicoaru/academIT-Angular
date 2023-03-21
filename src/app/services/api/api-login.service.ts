import { Injectable, Inject } from '@angular/core';
import { UserFromRequest } from 'src/app/models/interfaces/userFromRequest.interface';
import { User } from 'src/app/models/classes/classes';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError, retry} from "rxjs";
import { appConfigInjector, AppConfig } from '../../config/app.config';


@Injectable({
  providedIn: 'root'
})

export class ApiLoginService {

  
  private urlBase:string = this.appConfig.getUrlBase();


  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }

  

  login(userFromRequest:UserFromRequest):Observable<User> {
    return this.httpClient
      .post<User>(this.urlBase+'/sessions', userFromRequest,this.httpOptions)
  }







  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) {}


}



/*
  // esto iria en el subscribe
      .pipe(
        catchError(this.handleError)
      )


  // esto es una función
  private handleError(err: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    // return throwError(() => new Error('Something bad happened; please try again later.'));

    if (err.status === 0) {
      // Error del lado del Cliente
      console.error('Error en el lado del Cliente:', err.error);

      let error = {status: err.status, message: err.headers};
      return throwError(() => error);       
    } 
    else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong.
      console.error('Error en el lado del Servidor:', err.error);
      
      let error = {status: err.status, message: err.headers};
      return throwError(() => error);      
    }
  }
*/