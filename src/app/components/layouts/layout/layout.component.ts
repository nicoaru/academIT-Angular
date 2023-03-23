import { Component } from '@angular/core';
import { NavItemData } from 'src/app/models/interfaces/navItem.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  
  pathActual:string = document.location.pathname;

  isPrivate:boolean = this.pathActual.split('/')[1] === "privado" ? true : false;

  navItemsPublic:NavItemData[] = [    
    {
      title:"Inicio",
      href:"home"
    },
    {
      title:"Contacto",
      href:"contacto"
    },
    {
      title:"Privado",
      href:"login"
    }
  ];

  navItemsPrivate:NavItemData[] = [
    {
      title:"Inicio",
      href:"privado/home"
    },
    {
      title:"Clientes",
      href:"privado/clientes"
    },
    {
      title:"Pedidos",
      href:"privado/pedidos"
    },
    {
      title:"Muebles",
      href:"privado/muebles"
    },
    {
      title:"Logout",
      href:"#"
    }
  ]

  navItemsPrivateFooter:NavItemData[] = [
    {
      title:"Inicio",
      href:"privado/home"
    },
    {
      title:"Logout",
      href:"#"
    }
  ]





  constructor() {
    console.log(this.pathActual)
  }

}
