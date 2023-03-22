import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule, CdkAccordionItem } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';

import { InfoTextIconComponent } from './components/info-text-icon/info-text-icon.component';
import { FormContactoComponent } from './components/form-contacto/form-contacto.component';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TablaInfoComponent } from './components/tabla-info/tabla-info.component';
import { TablaInfoUpgradeComponent } from './components/tabla-info-upgrade/tabla-info-upgrade.component';
import { ModalComponent } from './components/modal/modal.component';
import { DetalleClienteAccordionComponent } from './components/detalle-cliente/detalle-cliente-accordion/detalle-cliente-accordion.component';
import { DetalleClienteModalComponent } from './components/detalle-cliente/detalle-cliente-modal/detalle-cliente-modal.component';
import { DetalleClienteItemDatosComponent } from './components/detalle-cliente/detalle-cliente-item-datos/detalle-cliente-item-datos.component';
import { EditNombreComponent } from './components/detalle-cliente/detalle-cliente-item-datos/detalle-cliente-edit-nombre/edit-nombre.component';
import { DetalleClienteItemPedidosComponent } from './components/detalle-cliente/detalle-cliente-item-pedidos/detalle-cliente-item-pedidos.component';
import { DetalleClientePedidosSubitemComponent } from './components/detalle-cliente/detalle-cliente-item-pedidos/detalle-cliente-pedidos-subitem/detalle-cliente-pedidos-subitem.component';
import { DetallePedidoModalComponent } from './components/detalle-pedido/detalle-pedido-modal/detalle-pedido-modal.component';
import { DetalleMuebleModalComponent } from './components/detalle-mueble/detalle-mueble-modal/detalle-mueble-modal.component';
import { DetalleMuebleAccordionComponent } from './components/detalle-mueble/detalle-mueble-accordion/detalle-mueble-accordion.component';
import { DetalleMuebleItemDatosComponent } from './components/detalle-mueble/detalle-mueble-item-datos/detalle-mueble-item-datos.component';
import { DetalleMuebleItemPedidoComponent } from './components/detalle-mueble/detalle-mueble-item-pedido/detalle-mueble-item-pedido.component';
import { DetallePedidoAccordionComponent } from './components/detalle-pedido/detalle-pedido-accordion/detalle-pedido-accordion.component';
import { DetallePedidoItemDatosComponent } from './components/detalle-pedido/detalle-pedido-item-datos/detalle-pedido-item-datos.component';
import { DetallePedidoItemMueblesComponent } from './components/detalle-pedido/detalle-pedido-item-muebles/detalle-pedido-item-muebles.component';
import { DetalleMueblePedidoSubitemComponent } from './components/detalle-mueble/detalle-mueble-item-pedido/detalle-mueble-pedido-subitem/detalle-mueble-pedido-subitem.component';



import { CollageHomeComponent } from './pages/home/collage-home/collage.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomePrivadoComponent } from './pages/privado/home-privado/home-privado.component';
import { ClientesPrivadoComponent } from './pages/privado/clientes-privado/clientes-privado.component';
import { LoginComponent } from './pages/login/login.component';
import { SucursalesHomeComponent } from './pages/home/sucursales-home/sucursales-home.component';
import { InfoHomeComponent } from './pages/home/info-home/info-home.component';
import { MueblesPrivadoComponent } from './pages/privado/muebles-privado/muebles-privado.component';
import { PedidosPrivadoComponent } from './pages/privado/pedidos-privado/pedidos-privado.component';

import { appConfigInjector, AppConfig} from './config/app.config';
import { CargarPrivadoComponent } from './pages/privado/cargar-privado/cargar-privado.component';
import { CargaClienteComponent } from './components/cargar/carga-cliente/carga-cliente.component';
import { CargaPedidoComponent } from './components/cargar/carga-pedido/carga-pedido.component';
import { CargaMuebleComponent } from './components/cargar/carga-mueble/carga-mueble.component';



@NgModule({
  declarations: [
    AppComponent,
    InfoTextIconComponent,
    FormContactoComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    ContactoComponent,
    HomePrivadoComponent,
    ClientesPrivadoComponent,
    LoginComponent,
    HomeComponent,
    CollageHomeComponent,
    SucursalesHomeComponent,
    InfoHomeComponent,
    AlertModalComponent,
    SpinnerComponent,
    TablaInfoComponent,
    TablaInfoUpgradeComponent,
    DetallePedidoModalComponent,
    ModalComponent,
    DetalleClienteModalComponent,
    DetalleClienteAccordionComponent,
    DetalleClienteItemDatosComponent,
    EditNombreComponent,
    DetalleClienteItemPedidosComponent,
    DetalleClientePedidosSubitemComponent,
    MueblesPrivadoComponent,
    PedidosPrivadoComponent,
    DetallePedidoModalComponent,
    DetallePedidoAccordionComponent,
    DetallePedidoItemDatosComponent,
    DetallePedidoItemMueblesComponent,
    DetalleMuebleModalComponent,
    DetalleMuebleAccordionComponent,
    DetalleMuebleItemDatosComponent,
    DetalleMuebleItemPedidoComponent,
    DetalleMueblePedidoSubitemComponent,
    CargarPrivadoComponent,
    CargaClienteComponent,
    CargaPedidoComponent,
    CargaMuebleComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: appConfigInjector, useValue: new AppConfig() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
