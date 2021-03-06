import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

import {AuthService} from './services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor( 
   private authSerive:AuthService,
   private router:Router,
    )    
    { }
  
  canActivate(): boolean{
    if(this.authSerive.loggedIn()){
      return true;
    }
    else{
      this.router.navigate(['/home'])
      return false;
    }
  }  
}
