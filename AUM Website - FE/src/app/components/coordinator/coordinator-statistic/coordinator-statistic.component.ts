import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coordinator-statistic',
  templateUrl: './coordinator-statistic.component.html',
  styleUrls: ['./coordinator-statistic.component.css'],
})
export class CoordinatorStatisticComponent implements OnInit {
  academic_year_id: number = 0;
  lstStatistic: any = [];
  lstAcademicYear: any = [];
  public fullname: any = '';
  pageSize = 10;
  currentPage = 1;

  constructor(
    private academicYearService: AcademicYearService,
    private statisticService: StatisticService,
    private userStore: UserStoreService,
    private auth: UserService
  ) {}

  ngOnInit() {
    this.userStore.getFullNameFromStore().subscribe((res) => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });
    this.academicYearService.getAllAcademicYear().subscribe((res) => {
      this.lstAcademicYear = res;
    });

    this.getStatistic();
  }

  onChageAcademicYear(event: any) {
    this.academic_year_id = event.target.value;
    this.getStatistic();
  }

  getStatistic() {
    this.statisticService
      .coordinatorStatistic(this.academic_year_id, this.fullname)
      .subscribe((res) => {
        this.lstStatistic = res;
      });
  }
}
