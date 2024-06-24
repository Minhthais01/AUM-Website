import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { RoleService } from 'src/app/services/role.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-admin-chart-active-time',
  templateUrl: './admin-chart-active-time.component.html',
  styleUrls: ['./admin-chart-active-time.component.css'],
})
export class AdminChartActiveTimeComponent implements OnInit {
  public role_id: number = 0;
  public lstWorkDuration: any = [];
  lstRoles: any = [];
  lstRoleNames: string[] = [];
  lstDailyAverageTime : number[] = [];

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
    private roleService :RoleService
  ) {}

  ngOnInit(): void {
    this.chartStatistic();
  }

  chartStatistic() {
    this.statisticService.workDuration(this.role_id).subscribe((res) =>{
      this.lstWorkDuration = res;
    })
    this.roleService.getAllRole().subscribe((res) =>{
      this.lstRoles = res;
      this.lstRoles.forEach((element:{
        role_id: number;
        role_name: string;
      }) => {
        this.lstRoleNames.push(element.role_name);
      });
      this.onBar();
    })
  }

  // Chart functions
  RadarChart() {
    const data = {
      labels: ['Admin', 'Manager', 'Coordinator', 'Student', 'Guest'],
      datasets: [
        {
          label: 'Daily average time (hours)',
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#71b657',
            '#e3632d',
          ],
        },
      ],
    };

    this.radarChart = new Chart('radarLineChart', {
      type: 'polarArea',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  LineChart() {
    const data = {
      labels: ['Admin', 'Manager', 'Coordinator', 'Student', 'Guest'],
      datasets: [
        {
          label: 'Total Active Time (hours)',
          data: [300, 50, 100, 50, 50],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#71b657',
            '#e3632d',
          ],
          hoverOffset: 4,
        },
      ],
    };

    this.radarChart = new Chart('lineChart', {
      type: 'pie',
      data: data,

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  BarChart() {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.lstRoleNames,
        datasets: [
          {
            label: 'Daily average time (hours)',

            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Total Active Time (hours)',

            data: [10, 12, 13, 15, 12, 13],
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
    this.labelChart = 'Pie';
    this.displayLineChart = 'block';
    this.displayBarChart = 'none';
    this.displayRadarChart = 'none';
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
    this.labelChart = 'Polar Area';
    this.displayRadarChart = 'block';
    this.displayBarChart = 'none';
    this.displayLineChart = 'none';
    this.RadarChart();
  }
}
