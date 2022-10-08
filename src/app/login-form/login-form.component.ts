import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(public auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogging(){
    this.auth.login()
    .subscribe(res =>{
      if(this.auth.isAuthenticated()){
        this.router.navigate(['tasks']);
      }
    }, error =>{
      alert('Wrong username or password')
    }
    );
  }  

}
