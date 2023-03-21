import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePrivadoComponent } from './pages/privado/home-privado/home-privado.component';
import { ClientesPrivadoComponent } from './pages/privado/clientes-privado/clientes-privado.component';
import { PedidosPrivadoComponent } from './pages/privado/pedidos-privado/pedidos-privado.component';
import { MueblesPrivadoComponent } from './pages/privado/muebles-privado/muebles-privado.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'privado', component: HomePrivadoComponent},
  {path: 'privado/home', component: HomePrivadoComponent},
  {path: 'privado/clientes', component: ClientesPrivadoComponent},
  {path: 'privado/clientes/:id', component: ClientesPrivadoComponent},
  {path: 'privado/pedidos', component: PedidosPrivadoComponent},
  {path: 'privado/pedidos/:id', component: PedidosPrivadoComponent},
  {path: 'privado/muebles', component: MueblesPrivadoComponent},
  {path: 'privado/muebles/:id', component: MueblesPrivadoComponent},
  {path: 'privado/cargar', component: ClientesPrivadoComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
