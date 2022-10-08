import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){

  }

  canActivate():boolean{
    if(!this.auth.isAdmin()){
      this.router.navigate(['tasks']);
    }
    return true;
  }
  
}
