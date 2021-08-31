import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from './Services/AuthGuard/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private AuthGuardserv: AuthGuardService, private router: Router){}
  canActivate():boolean{
    if (!this.AuthGuardserv.gettoken()) {  
      this.router.navigateByUrl("/Login");  
    }  
  return this.AuthGuardserv.gettoken();
  }

}
    
    

