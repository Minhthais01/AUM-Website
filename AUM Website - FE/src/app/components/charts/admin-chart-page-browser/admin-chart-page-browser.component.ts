import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-chart-page-browser',
  templateUrl: './admin-chart-page-browser.component.html',
  styleUrls: ['./admin-chart-page-browser.component.css'],
})
export class AdminChartPageBrowserComponent implements OnInit {
  lstPageData: any = [];
  lstNamePage: string[] = [];
  lstTotalVisitPage: number[] = [];
  lstAverageTimePage: number[] = [];
  lstDailyAverageTimePage: number[] = [];
  lstTotalTimePage: number[] = [];

  lstBrowserData: any = [];
  lstNameBrowser: string[] = [];
  lstTotalVisitBrowser: number[] = [];
  lstAverageTimeBrowser: number[] = [];
  lstDailyAverageTimeBrowser: number[] = [];
  lstTotalTimeBrowser: number[] = [];

  lstRoleData: any = [];
  lstNameRole: string[] = [];
  lstTotalVisitRole: number[] = [];
  lstAverageTimeRole: number[] = [];
  lstDailyAverageTimeRole: number[] = [];
  lstTotalTimeRole: number[] = [];

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
  labelChart: string = 'Pages';
  barChart: any;
  lineChart: any;
  radarChart: any;
  displayBarChart: string = 'block';
  displayLineChart: string = 'none';
  displayRadarChart: string = 'none';

  //Selected
  selectedPage: string = 'block';
  selectedBrowser: string = 'none';
  selectedRole: string = 'none';

  constructor(
    private router: Router,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.chartStatistic();
  }

  chartStatistic() {
    this.statisticService.pageChart().subscribe((res) => {
      this.lstPageData = res;
      console.log(this.lstPageData);
      this.lstPageData.forEach(
        (item: {
          pageName: string;
          totalVisit: number;
          averageTime: number;
          dailyAverageTime: number;
          totalTime: number;
        }) => {
          this.lstNamePage.push(item.pageName);
          this.lstTotalVisitPage.push(item.totalVisit);
          this.lstAverageTimePage.push(item.averageTime);
          this.lstDailyAverageTimePage.push(item.dailyAverageTime);
          this.lstTotalTimePage.push(item.totalTime);
        }
      );
          this.statisticService.browserChart().subscribe((res) => {
            this.lstBrowserData = res;
            this.lstBrowserData.forEach(
              (item: {
                browserName: string;
                totalVisit: number;
                averageTime: number;
                dailyAverageTime: number;
                totalTime: number;
              }) => {
                this.lstNameBrowser.push(item.browserName);
                this.lstTotalVisitBrowser.push(item.totalVisit);
                this.lstAverageTimeBrowser.push(item.averageTime);
                this.lstDailyAverageTimeBrowser.push(item.dailyAverageTime);
                this.lstTotalTimeBrowser.push(item.totalTime);
              }
            );
                this.statisticService.roleChart().subscribe((res) => {
                  this.lstRoleData = res;
                  this.lstRoleData.forEach(
                    (item: {
                      roleName: string;
                      totalVisit: number;
                      averageTime: number;
                      dailyAverageTime: number;
                      totalTime: number;
                    }) => {
                      this.lstNameRole.push(item.roleName);
                      this.lstTotalVisitRole.push(item.totalVisit);
                      this.lstAverageTimeRole.push(item.averageTime);
                      this.lstDailyAverageTimeRole.push(item.dailyAverageTime);
                      this.lstTotalTimeRole.push(item.totalTime);
                    }
                  );
                  this.BarChart();
                });
          });
    });

  }

  //Role
  RadarChart() {
    this.barChart = new Chart('radarChart', {
      type: 'bar',
      data: {
        labels: this.lstNameRole,
        datasets: [
          {
            label: 'Total Visits',

            data: this.lstTotalVisitRole,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Average Time per Visit (hours)',

            data: this.lstAverageTimeRole,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1,
          },
          {
            label: 'Daily average time (hours)',

            data: this.lstDailyAverageTimeRole,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1,
          },
          {
            label: 'Total Active Time (hours)',

            data: this.lstTotalTimeRole,
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

  //Browser
  LineChart() {
    this.barChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: this.lstNameBrowser,
        datasets: [
          {
            label: 'Total Visits',

            data: this.lstTotalVisitBrowser,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Average Time per Visit (hours)',

            data: this.lstAverageTimeBrowser,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1,
          },
          {
            label: 'Daily average time (hours)',

            data: this.lstDailyAverageTimeBrowser,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1,
          },
          {
            label: 'Total Active Time (hours)',

            data: this.lstTotalTimeBrowser,
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

  //Page
  BarChart() {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.lstNamePage,
        datasets: [
          {
            label: 'Total Visits',

            data: this.lstTotalVisitPage,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Average Time per Visit (hours)',

            data: this.lstAverageTimePage,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1,
          },
          {
            label: 'Daily average time (hours)',

            data: this.lstDailyAverageTimePage,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
            borderWidth: 1,
          },
          {
            label: 'Total Active Time (hours)',

            data: this.lstTotalTimePage,
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
    this.router.navigate(['/Admin-Statistic']);
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
    this.labelChart = 'Pages';
    this.displayBarChart = 'block';
    this.displayLineChart = 'none';
    this.displayRadarChart = 'none';
    this.selectedPage = 'block';
    this.selectedBrowser = 'none';
    this.selectedRole = 'none';
    this.BarChart();
    // const type = 'bar';
    // this.barChart.config.type = type;
    // this.barChart.update();
  }

  onLine() {
    this.idButtonLine = 'btn-readMore1';
    this.idButtonBar = 'btn-readMore';
    this.idButtonRadar = 'btn-readMore';
    this.buttonLineLetter = this.white;
    this.buttonLineBackground = this.red;
    this.buttonBarLetter = this.red;
    this.buttonBarBackground = this.white;
    this.buttonRadarLetter = this.red;
    this.buttonRadarBackground = this.white;
    this.labelChart = 'Browsers';
    this.displayLineChart = 'block';
    this.displayBarChart = 'none';
    this.displayRadarChart = 'none';
    this.selectedBrowser = 'block';
    this.selectedPage = 'none';
    this.selectedRole = 'none';
    this.LineChart();
  }

  onRadar() {
    this.idButtonRadar = 'btn-readMore1';
    this.idButtonBar = 'btn-readMore';
    this.idButtonLine = 'btn-readMore';
    this.buttonRadarLetter = this.white;
    this.buttonRadarBackground = this.red;
    this.buttonLineLetter = this.red;
    this.buttonLineBackground = this.white;
    this.buttonBarLetter = this.red;
    this.buttonBarBackground = this.white;
    this.labelChart = 'Roles';
    this.displayRadarChart = 'block';
    this.displayBarChart = 'none';
    this.displayLineChart = 'none';
    this.selectedRole = 'block';
    this.selectedBrowser = 'none';
    this.selectedPage = 'none';
    this.RadarChart();
  }
}
