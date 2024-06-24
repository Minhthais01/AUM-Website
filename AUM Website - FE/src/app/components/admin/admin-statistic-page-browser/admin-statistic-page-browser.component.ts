import { StatisticService } from 'src/app/services/statistic.service';
import { PageViewService } from './../../../services/page-view.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-statistic-page-browser',
  templateUrl: './admin-statistic-page-browser.component.html',
  styleUrls: ['./admin-statistic-page-browser.component.css'],
})
export class AdminStatisticPageBrowserComponent implements OnInit {
  lstPage: any = [];
  lstBrowser: any = [];
  lstRole: any = [];
  lstStatistic: any = [];

  pageName: string = '';
  browserName: string = '';
  role: string = '';

  pageSize = 5;
  currentPage = 1;

  constructor(
    private pageViewService: PageViewService,
    private statisticService: StatisticService
  ) {}

  ngOnInit() {
    this.pageViewService.getAllPageBrowseRole().subscribe((res: any) => {
      this.lstPage = res[0];
      this.lstBrowser = res[1];
      this.lstRole = res[2];
      this.pageName = this.lstPage[0];
      this.browserName = this.lstBrowser[0];
      this.role = this.lstRole[0];
      this.statistic();
    });
  }

  onChagePage(event: any) {
    this.pageName = event.target.value;
    this.statistic();
  }

  onChageBrowser(event: any) {
    this.browserName = event.target.value;
    this.statistic();
  }

  onChageRole(event: any) {
    this.role = event.target.value;
    this.statistic();
  }

  statistic() {
    this.statisticService
      .pageBrowserRoleStatistic(this.pageName, this.browserName, this.role)
      .subscribe((res) => {
        this.lstStatistic = res;
      });
  }
}
