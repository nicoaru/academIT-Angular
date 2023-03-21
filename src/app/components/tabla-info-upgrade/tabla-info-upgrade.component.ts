import { Component, ComponentRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ApplicationRef, createComponent, ViewContainerRef, EnvironmentInjector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-tabla-info-upgrade',
  templateUrl: './tabla-info-upgrade.component.html',
  styleUrls: ['./tabla-info-upgrade.component.css']
})
export class TablaInfoUpgradeComponent {
  @Input() columns:ColumnTableInfoDefinitionUPGRADE[];
  @Input() data:any[];
  

  renderer:Renderer2;


  rows:any[];



  getRows():any[] {
    let _rows:any[] = this.data.map(elem => {
      let _row:any = {id:elem.id};
      
      this.columns.forEach(column => {
        let field:string = column.field;
        let value = column.getter ? column.getter(elem) : elem[column.field]
        let type:string;
        let isComponent:boolean = column.isComponent;
        if(value instanceof HTMLElement) type = "HTMLElement";
        else if(value instanceof ComponentRef) type = "Component";

        _row[field] = {value, type, isComponent};
      })

      return _row;
    })

    return _rows;
  
  }

  //** ACÁ TIRRA UN ERROR **//
  //** ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: 'text-info'. It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook? **/
  generarComponente(componente:any, container:any, inputs:any):void {

    let componentRef = createComponent(componente, {environmentInjector: this.injector, hostElement: container})
 
    // setea los @Input del componente que creamos
    for (const property in inputs ) {
      componentRef.setInput(property, inputs[property]);
    }

    // Lo de arriba es esto pero iterando
    // componentRef.setInput('colorClassBS','text-info')
    
    // Si sacamos esta deja de tirar el error, pero igualmente no toma los update de @Input
    this.appRef.attachView(componentRef.hostView);       
  }


  


  constructor(
    renderer:Renderer2,
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
    private viewContainerRef: ViewContainerRef
  ) {
    this.renderer = renderer
  }

  ngOnInit(): void {
    console.log("columns: \n", this.columns)
    this.rows = this.getRows();
    console.log("rows: \n", this.rows)
  }

}


//** isComponent:false => getter debe devolver el valor primitivo que quiero mostrar, o un DOMElement
//** isComponent:true => la función getter debe devolver
//**    {
//**      contentType:ComponentClass, 
//**      inputs:{ pares de clave/valor -> clave:string / valor:any -> representando el nombre del @Input y el valor a asignar}
//**    }

export interface ColumnTableInfoDefinitionUPGRADE {
  title:string;
  field:string;
  isComponent?:boolean;
  getter?:Function
}