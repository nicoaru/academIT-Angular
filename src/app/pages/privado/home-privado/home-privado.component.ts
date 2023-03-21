import { Component } from '@angular/core';

@Component({
  selector: 'app-home-privado',
  templateUrl: './home-privado.component.html',
  styleUrls: ['./home-privado.component.css']
})
export class HomePrivadoComponent {
  pathActual:string = document.location.pathname;

  constructor() {
    console.log(this.pathActual.split('/')[1])
  }
}
