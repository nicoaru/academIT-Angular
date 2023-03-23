import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';

@Component({
  selector: 'app-header-private',
  templateUrl: './header-private.component.html',
  styleUrls: ['./header-private.component.css']
})
export class HeaderPrivateComponent {
  

  //** Constructor **//
  //** Constructor **//
  constructor(
    private sessionService:SessionService,
    private router: Router,
    private matDialog:MatDialog
  ) {}




  //** Métodos **//
  //** Métodos **//
  
  async logout():Promise<void> {
    try {
      const result:any = await this.sessionService.logout();
      console.log("Se desloggeo: ", result)
      this.router.navigate(['/'])
    }
    catch(err) {
      console.log("No se pudo desloggear: ", err)
      this.matDialog.open(AlertModalComponent, { data: {message: err.message}})
    }
  }


}
