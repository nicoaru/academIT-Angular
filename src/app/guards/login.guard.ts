import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  
  constructor(
    private sessionService: SessionService, 
    private router: Router
  ) { }
  
  
  canActivate():| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Esta loggeado: ", this.sessionService.isLogged)
    console.log("Usuario: ", this.sessionService.usuario)
    if (this.sessionService.isLogged) {
      console.log('Está loggeado');
      this.router.navigate(['/privado']);
      return false;
    }
    // logged in, so return true
    return true;
  }
  
}
