import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {UserInfoComponent} from './user-info/user-info.component';
import {UserInfoFormComponent} from './user-info/user-info-form/user-info-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AUTH_API_URL, TASKS_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import {JwtModule} from '@auth0/angular-jwt'
import { ACCESS_TOKEN_KEY } from './shared/auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';
import { UserStatsComponent } from './user-stats/user-stats.component';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:'', component:LoginFormComponent},
  {path:'tasks', component:UserInfoComponent, canActivate: [AuthGuard]},
  {path:'stats', component:UserStatsComponent, canActivate: [AuthGuard, RoleGuard]}
];

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent, 
    UserInfoComponent, 
    UserInfoFormComponent, 
    LoginFormComponent, 
    UserStatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),

    JwtModule.forRoot({
      config:{
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  providers: [
    {
      provide: AUTH_API_URL,
      useValue: environment.authApi
    },
    {
      provide: TASKS_API_URL,
      useValue: environment.tasksApi
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
