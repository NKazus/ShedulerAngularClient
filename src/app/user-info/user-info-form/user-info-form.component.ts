import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/shared/user-info.service';
import { NgForm }   from '@angular/forms';
import { UserInfo } from 'src/app/shared/user-info.model';
import { ToastrService } from 'ngx-toastr';
import { TaskParameterService } from 'src/app/shared/task-parameter.service';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent implements OnInit {
  constructor(public service:UserInfoService, private toastr:ToastrService, public task:TaskParameterService) { }

  ngOnInit(): void {
  }

  onSubmit(){
      if(this.service.formData.taskID==0)
        this.addRecord();
      else
        this.updateRecord();
      this.service.formData.taskType=1;
  }

  addRecord(){
    this.service.postTaskInfo().subscribe(
      res=>{ 
        this.resetForm();
        this.toastr.success('Task added','Task State:');
        this.service.refreshTaskList();
      },
      err=>{ console.log (err)}
    );
  }

  updateRecord(){
    this.service.putTaskInfo().subscribe(
      res=>{ 
        this.resetForm();
        this.toastr.info('Task updated','Task State:');
        this.service.refreshTaskList();
      },
      err=>{ console.log (err)}
    );
  }

  onTaskSelected(val:any){
    this.task.changeTaskParameter(val);
    
  }

  resetForm(){
    this.service.formData = new UserInfo(); 
    this.task.changeTaskParameter(this.service.formData.taskType);
  }

}
