import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user';
import { AuthenticateService } from '../auth/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: User;
  constructor(private router: Router, private userService: AuthenticateService) {
    this.userService.currentUser.subscribe(data => {
        this.currentUser = data;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.currentUser) {
      if(route.data.roles && route.data.roles.indexOf(this.currentUser.roles[0]) === -1){
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}