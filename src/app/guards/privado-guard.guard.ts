import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class PrivadoGuardGuard {

  constructor(
    private sessionService: SessionService, 
    private router: Router
  ) { }
  
  
  canActivate():| Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("Esta loggeado: ", this.sessionService.isLogged)
    console.log("Usuario: ", this.sessionService.usuario)
    if (!this.sessionService.isLogged) {
      console.log('No está loggeado');
      this.router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    return true;
  }

}
