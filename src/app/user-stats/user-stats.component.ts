import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../shared/user-info.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  constructor(public service:UserInfoService, private router:Router) { }

  ngOnInit(): void {
    this.service.refreshStatsList();
  }

  onShowingTasks(){
    this.router.navigate(['tasks']);
  }

}
