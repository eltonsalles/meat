import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './user.model';
import { MEAT_API } from '../../app.api';
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import {NavigationEnd, Router} from '@angular/router';

@Injectable()
export class LoginService {

  user: UserModel

  lastUrl: string

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
  }

  login(email: string, password: string): Observable<UserModel> {
    return this.http
      .post<UserModel>(`${MEAT_API}/login`, { email, password })
      .do(user => this.user = user);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login', btoa(path)])
  }

  logout() {
    this.user = undefined
  }
}
