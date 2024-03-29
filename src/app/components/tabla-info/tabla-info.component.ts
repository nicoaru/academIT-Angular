import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-tabla-info',
  templateUrl: './tabla-info.component.html',
  styleUrls: ['./tabla-info.component.css']
})
export class TablaInfoComponent implements OnInit, OnChanges {
  @Input() columns:ColumnTableInfoDefinition[];
  @Input() data:any[];
  //@Input() linkToDetail:string;
  @Output() onViewDetails = new EventEmitter<number>();
  @Output() onDeleteElement = new EventEmitter<number>();

  rows:any[];


  getRows():any[] {
    let _rows:any[] = this.data.map(elem => {
      let _row:any = {id:elem.id};
      
      this.columns.forEach(column => {
        let field:string = column.field;
        let value = column.getter ? column.getter(elem) : elem[column.field];
        _row[field] = value;
      })

      return _row;
    })

    return _rows;
  }

  viewDetails(id:number):void {
    this.onViewDetails.emit(id);
  }

  deleteElement(id:number):void {
    this.onDeleteElement.emit(id);
  }
 


  constructor() {}


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("columns: \n", this.columns)
    console.log("Data que llega a tabla: \n", this.data)
    this.rows = this.getRows();
    console.log("rows: \n", this.rows)
  }


}


//** getter es opcional debe devolver el valor primitivo que quiero mostrar, o un DOMElement
//** si no recibe un getter toma el dato directamente del campo que coincide con field

export interface ColumnTableInfoDefinition {
  title:string;
  field:string;
  getter?:Function
}


