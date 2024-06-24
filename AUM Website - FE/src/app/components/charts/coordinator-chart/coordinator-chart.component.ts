import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { StatisticService } from 'src/app/services/statistic.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-coordinator-chart',
  templateUrl: './coordinator-chart.component.html',
  styleUrls: ['./coordinator-chart.component.css'],
})
export class CoordinatorChartComponent implements OnInit {
  lstStatistic: any = [];
  lstLabel: string[] = [];
  lstArticle: string[] = [];
  lstContributor: string[] = [];
  public fullname: any = '';
  //Color
  red: string = '#ff014fff';
  white: string = 'white';
  //Button
  idButtonBar: string = 'btn-readMore1';
  idButtonLine: string = 'btn-readMore';
  idButtonRadar: string = 'btn-readMore';
  buttonBarLetter: string = this.white;
  buttonBarBackground: string = this.red;
  buttonLineLetter: string = this.red;
  buttonLineBackground: string = this.white;
  buttonRadarLetter: string = this.red;
  buttonRadarBackground: string = this.white;
  //Chart
  labelChart: string = 'Bar';
  barChart: any;
  lineChart: any;
  radarChart: any;
  displayBarChart: string = 'block';
  displayLineChart: string = 'none';
  displayRadarChart: string = 'none';

  constructor(
    private router: Router,
    private statisticService: StatisticService,
    private userStore: UserStoreService,
    private auth: UserService
  ) {}

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe((res) => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });
    this.chartCoordinator();
  }

  chartCoordinator() {
    this.statisticService.coordinatorStatistic(0, this.fullname).subscribe((res) => {
      this.lstStatistic = res;
      this.lstStatistic.forEach(
        (item: { endDate: any; usersCount: any; contribution: any }) => {
          const labelDate = moment(new Date(item.endDate)).format('yyyy-MM-DD');
          this.lstLabel.push(labelDate);
          this.lstArticle.push(item.usersCount);
          this.lstContributor.push(item.contribution);
        }
      );
      this.BarChart();
    });
  }

  BarChart() {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.lstLabel,
        datasets: [
          {
            label: 'Total Articles',

            data: this.lstArticle,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Total Contributors',

            data: this.lstContributor,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  //Click Events

  onPage() {
    this.router.navigate(['/View-CoordinatorStatistic']);
  }

  onBar() {
    this.idButtonBar = 'btn-readMore1';
    this.idButtonLine = 'btn-readMore';
    this.idButtonRadar = 'btn-readMore';
    this.buttonBarLetter = this.white;
    this.buttonBarBackground = this.red;
    this.buttonLineLetter = this.red;
    this.buttonLineBackground = this.white;
    this.buttonRadarLetter = this.red;
    this.buttonRadarBackground = this.white;
    this.labelChart = 'Bar';
    this.displayBarChart = 'block';
    this.displayLineChart = 'none';
    this.displayRadarChart = 'none';
    this.BarChart();
    // const type = 'bar';
    // this.barChart.config.type = type;
    // this.barChart.update();
  }
}
