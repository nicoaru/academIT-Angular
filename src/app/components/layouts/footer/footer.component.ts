import { Component, Input } from '@angular/core';
import { NavItemData } from 'src/app/models/interfaces/navItem.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() navItems:NavItemData[];

}
