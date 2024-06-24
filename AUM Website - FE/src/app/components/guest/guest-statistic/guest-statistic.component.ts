import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-guest-statistic',
  templateUrl: './guest-statistic.component.html',
  styleUrls: ['./guest-statistic.component.css'],
})
export class GuestStatisticComponent implements OnInit {
  baseImgUrl: string = 'https://localhost:7195/Imgs/';
  academic_year_id: number = 0;
  lstStatistic: any = [];
  lstAcademicYear: any = [];
  public fullname: any = '';
  pageSize = 5;
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
      this.lstAcademicYear.reverse();
      this.getStatistic(this.academic_year_id);
    });
  }

  onChageAcademicYear(event: any) {
    this.academic_year_id = event.target.value;
    this.getStatistic(this.academic_year_id);
  }

  getStatistic(id: number) {
    this.statisticService
      .guestStatistic(this.academic_year_id, this.fullname)
      .subscribe((res) => {
        this.lstStatistic = res;
        this.lstStatistic.reverse();
      });
  }
}