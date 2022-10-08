import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Token } from './token.model';
import { Login } from './login.model';

export const ACCESS_TOKEN_KEY = 'tasks_access_token';
export const TOKEN_ROLE = 'token_role'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginInfo:Login = new Login();

  constructor(private http:HttpClient,
    @Inject(AUTH_API_URL) private authApiUrl:string,
    private jwtHelper:JwtHelperService,
    private router: Router) { }

  login():Observable<Token>{
    return this.http.post<Token>(`${this.authApiUrl}api/Auth`,this.loginInfo).pipe(
      tap(token =>{
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        localStorage.setItem(TOKEN_ROLE, token.token_role);
      })
    );
  }

  isAdmin():boolean{
    var role = localStorage.getItem(TOKEN_ROLE);
    return role=="Admin";

  }

  isAuthenticated():boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token!=null && !this.jwtHelper.isTokenExpired(token);
  }

  logout():void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(TOKEN_ROLE);
      this.router.navigate(['']);
  }
}
