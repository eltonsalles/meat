import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) {
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path)
  }

  checkAuthentication(path: string): boolean {
    let loggedIn = this.loginService.isLoggedIn();
    if (!loggedIn) {
      this.loginService.handleLogin(`/${path}`)
    }

    return loggedIn
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication(route.routeConfig.path)
  }
}
