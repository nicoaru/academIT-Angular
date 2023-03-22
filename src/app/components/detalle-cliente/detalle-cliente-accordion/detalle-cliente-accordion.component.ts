import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Cliente, Mueble, TipoCliente } from 'src/app/models/interfaces/entidades.interfaces';
import { EmailValidator, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { TiposClienteApiService } from 'src/app/services/api/tipos-cliente-api.service';
import { MueblesApiService } from 'src/app/services/api/muebles-api.service';
import { ClientesApiService } from 'src/app/services/api/clientes-api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-detalle-cliente-accordion',
  templateUrl: './detalle-cliente-accordion.component.html',
  styleUrls: ['./detalle-cliente-accordion.component.css']
})
export class DetalleClienteAccordionComponent {

  constructor() { }

}