import { Component, Input } from '@angular/core';
import { NavItemData } from 'src/app/models/interfaces/navItem.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  @Input() navItems:NavItemData[];

}
