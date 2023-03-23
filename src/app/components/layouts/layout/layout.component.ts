import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavItemData } from 'src/app/models/interfaces/navItem.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  isPrivate:boolean;

  navItemsPublic:NavItemData[] = [    
    {
      title:"Inicio",
      href:"/"
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
      href:"/"
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





  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let pathActual = event.url;
        console.log('Actual path:', pathActual);
        this.isPrivate = pathActual.split('/')[1] === "privado" ? true : false;       
      }
    });
    
    

  }


}
