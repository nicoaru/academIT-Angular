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

  getById(idPedido:number):Observable<Pedido>{
    return this.httpClient
      .get<Pedido>(this.urlBase+'/pedidos/'+idPedido, this.httpOptions)
  }
  
  updateById(idPedido:number, updatedPedido:Pedido):Observable<Pedido> {

    return this.httpClient
      .put<Pedido>(this.urlBase+'/pedidos/'+idPedido, updatedPedido, this.httpOptions)
  }

  save(nuevoPedido:Pedido):Observable<Pedido> {
    return this.httpClient
      .post<Pedido>(this.urlBase+'/pedidos/', nuevoPedido, this.httpOptions)
  }

  deleteById(idPedido:number):Observable<Pedido> {
    return this.httpClient
      .delete<Pedido>(this.urlBase+'/pedidos/'+idPedido, this.httpOptions)
  }


  constructor(
    private httpClient:HttpClient,
    @Inject(appConfigInjector) private appConfig:AppConfig
  ) { }

}
