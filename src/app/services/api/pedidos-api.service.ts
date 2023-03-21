import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig, appConfigInjector } from '../../config/app.config';
import { Observable } from 'rxjs';
import { Cliente, Pedido } from '../../models/interfaces/entidades.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PedidosApiService {
  private urlBase:string = this.appConfig.getUrlBase();

  private httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  }


  getAll():Observable<Pedido[]>{
    return this.httpClient
      .get<Pedido[]>(this.urlBase+'/pedidos', this.httpOptions)
  }

  updateById(idCliente:number, updatedPedido:Pedido):Observable<Pedido> {

    return this.httpClient
      .put<Pedido>(this.urlBase+'/pedidos/'+idCliente, updatedPedido, this.httpOptions)
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }

}
