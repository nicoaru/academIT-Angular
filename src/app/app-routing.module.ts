import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { HomePrivadoComponent } from './pages/privado/home-privado/home-privado.component';
import { ClientesPrivadoComponent } from './pages/privado/clientes-privado/clientes-privado.component';
import { PedidosPrivadoComponent } from './pages/privado/pedidos-privado/pedidos-privado.component';
import { MueblesPrivadoComponent } from './pages/privado/muebles-privado/muebles-privado.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PrivadoGuardGuard } from './guards/privado-guard.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'privado', component: HomePrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/home', component: HomePrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/clientes', component: ClientesPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/clientes/:id', component: ClientesPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/pedidos', component: PedidosPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/pedidos/:id', component: PedidosPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/muebles', component: MueblesPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  {path: 'privado/muebles/:id', component: MueblesPrivadoComponent, canActivate: [PrivadoGuardGuard]},
  { path: '**', component: PageNotFoundComponent }
  // { path: '**',   redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
