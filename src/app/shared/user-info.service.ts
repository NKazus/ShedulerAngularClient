import { Inject, Injectable } from '@angular/core';
import { UserInfo } from './user-info.model';
import {HttpClient} from "@angular/common/http";
import { TASKS_API_URL } from '../app-injection-tokens';
import { AccountStats } from './account-stats.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http:HttpClient,
    @Inject(TASKS_API_URL) private tasksApiUrl:string) { }

  formData:UserInfo = new UserInfo();
  dataList:UserInfo[];
  statsList:AccountStats[];

  readonly baseURL = 'api/UserInfo'

  postTaskInfo(){
    return this.http.post(`${this.tasksApiUrl}${this.baseURL}`,this.formData);
  }

  putTaskInfo(){
    return this.http.put(`${this.tasksApiUrl}${this.baseURL}/${this.formData.taskID}`,this.formData);
  }

  deleteTaskInfo(id:number){
    return this.http.delete(`${this.tasksApiUrl}${this.baseURL}/${id}`);
  }

  refreshTaskList(){
    this.http.get(`${this.tasksApiUrl}${this.baseURL}`)
    .toPromise()
    .then(res=> this.dataList = res as UserInfo[]);
  }

  refreshStatsList(){
    this.http.get(`${this.tasksApiUrl}${this.baseURL}/stats`)
    .toPromise()
    .then(res=> this.statsList = res as AccountStats[]);
  }
}
