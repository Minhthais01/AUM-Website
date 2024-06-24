import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-manager-statistic-approve-reject',
  templateUrl: './manager-statistic-approve-reject.component.html',
  styleUrls: ['./manager-statistic-approve-reject.component.css']
})
export class ManagerStatisticApproveRejectComponent implements OnInit{

  public lstFaculty : any = [];
  public lstAcademic : any = [];
  public lstStatistic : any = [];

  selectedFaculty : number = 0;
  selectAcademic : number = 0;
  pageSize = 5;
  currentPage = 1;

  currentYear : any = "";

  constructor(
    private facultyAPI : FacultyService,
    private academicAPI : AcademicYearService,
    private statisticalAPI : StatisticService
  ){}

  ngOnInit(): void {
    if(this.selectAcademic != 0){
      this.sort(this.selectAcademic);
    }
    else{
      this.sort(this.selectAcademic);
    }

    this.getAllAcademicYear();
    this.getAllFaculty();
  }

  getAllAcademicYear(){
    this.academicAPI.getAllAcademicYear().subscribe(data => {
      this.lstAcademic = data;
    });
  }

  getAllFaculty(){
    this.facultyAPI.getAllFaculty().subscribe(data => {
      this.lstFaculty = data.filter((item: { faculty_name: string; }) => item.faculty_name !== "None");
    });
  }


  onSelectChange(value: any){
    this.selectAcademic = value;
    this.ngOnInit();
  }

  sort(academic:any){
    this.statisticalAPI.statisticalContributionApprovedRejected(academic).subscribe(data => {
      this.lstStatistic = data;

      for(const d of this.lstStatistic){
        this.currentYear = d.academic;
      }
    });
  }
}
