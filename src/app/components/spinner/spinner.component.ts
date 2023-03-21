import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
@Input() size:string = '30px';
@Input() colorClassBS:string = null;

sizeStyle:string;

constructor() {}

ngOnInit(): void {
  this.sizeStyle = `width: ${this.size}; height: ${this.size}`;  
}

onChanges


}
