import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.css'],
})
export class AdminStatisticComponent implements OnInit {
  baseImgUrl: string = 'https://localhost:7195/Imgs/';
  academic_year_id: number = 0;
  lstStatistic: any = [];
  lstAcademicYear: any = [];

  pageSize = 5;
  currentPage = 1;

  constructor(
    private academicYearService: AcademicYearService,
    private statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.academicYearService.getAllAcademicYear().subscribe((res) => {
      this.lstAcademicYear = res;
      this.lstAcademicYear.reverse();
      this.academic_year_id = this.lstAcademicYear[0].academic_year_id;
      this.getStatistic(this.academic_year_id);
    });
  }

  onChageAcademicYear(event: any) {
    this.academic_year_id = event.target.value;
    this.getStatistic(this.academic_year_id);
  }

  getStatistic(id: number) {
    this.statisticService
      .adminStatistic(this.academic_year_id)
      .subscribe((res) => {
        this.lstStatistic = res.filter((item: { facultyName: string; }) => item.facultyName !== "None");
      });
  }
}
