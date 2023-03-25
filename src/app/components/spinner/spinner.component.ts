import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit{
  @Input() size:string = '80px';
  @Input() color:string = '#3498db'
  @Input() classes:string = null;

  style:string;

  constructor() {}

  ngOnInit(): void {
    this.style = `width: ${this.size}; height: ${this.size}; border-top-color: ${this.color}, border-rigth-color: ${this.color}, border-bottom-color: ${this.color}`;  
  }

}
