import { RoleService } from './../../../services/role.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-statistic-ative-time',
  templateUrl: './admin-statistic-ative-time.component.html',
  styleUrls: ['./admin-statistic-ative-time.component.css']
})
export class AdminStatisticAtiveTimeComponent implements OnInit{
  public role_id: number = 0;
  public lstWorkDuration: any = [];
  public lstRoles: any = [];
  pageSize = 5;
  currentPage = 1;

constructor(
  private statisticService: StatisticService,
  private roleService :RoleService
){}

  ngOnInit(): void {
    this.getAllRole();
    this.workDuration();
  }

  workDuration(){
    this.statisticService.workDuration(this.role_id).subscribe(data =>{
      this.lstWorkDuration = data;
    })
  }
  getAllRole(){
    this.roleService.getAllRole().subscribe(data =>{
      this.lstRoles = data;
    })
  }
  onSelectRole(event:any){
    this.role_id = event.target.value;
    this.workDuration();
  }
}
