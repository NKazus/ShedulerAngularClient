import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { TaskParameterService } from '../shared/task-parameter.service';
import { UserInfo } from '../shared/user-info.model';
import { UserInfoService } from '../shared/user-info.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  
  constructor(public service:UserInfoService, 
    private toastr:ToastrService, public task:TaskParameterService, public auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.service.refreshTaskList();
  }

  onLoggingOut(){
    this.auth.logout();
  }

  public get adminRole():boolean{
    return this.auth.isAdmin();
  }

  onShowingStats(){
    this.router.navigate(['stats']);
  }

  populateForm(selectedLine:UserInfo){
    this.service.formData=Object.assign({},selectedLine);
    this.task.changeTaskParameter(this.service.formData.taskType);
  }

  deleteTask(id:number){
    if(confirm('Delete task?')){
      this.service.deleteTaskInfo(id).subscribe(
        res=> { 
          this.toastr.error('Task deleted','Task State:');
          this.service.formData = new UserInfo();
          this.task.changeTaskParameter(this.service.formData.taskType);
          this.service.refreshTaskList();
        },
        err=> { console.log (err)}
      );
    }
  }

}
