import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-chart-approval-reject',
  templateUrl: './admin-chart-approval-reject.component.html',
  styleUrls: ['./admin-chart-approval-reject.component.css'],
})
export class AdminChartApprovalRejectComponent implements OnInit {
  lstStatistic: any = [];
  lstLabel: string[] = [];
  lstArticle: string[] = [];
  lstContributor: string[] = [];
  lstPercenContributor: string[] = [];
  lstPercenArticle: string[] = [];
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
  labelChart: string = 'Mix';
  barChart: any;
  lineChart: any;
  radarChart: any;
  displayBarChart: string = 'block';
  displayLineChart: string = 'none';
  displayRadarChart: string = 'none';

  constructor(
    private router: Router,
    private statisticService: StatisticService
  ) { }

  ngOnInit(): void {
    this.chartAdmin();
    // this.getData(1);
  }

  // getData(academicYearId: number){
  //   this.statisticService.adminStatistic(academicYearId).subscribe(data => {
  //     console.table(data);
  //   })
  // }

  chartAdmin() {
    this.statisticService.adminChart().subscribe((res) => {
      this.lstStatistic = res;
      this.lstStatistic.forEach(
        (item: {
          facultyName: any;
          contributors: any;
          articles: any;
          percenContributor: any;
          percenArticles: any;
        }) => {
          if(item.facultyName != 'None'){
            this.lstLabel.push(item.facultyName);
            this.lstArticle.push(item.articles);
            this.lstContributor.push(item.contributors);
            this.lstPercenContributor.push(item.percenContributor);
            this.lstPercenArticle.push(item.percenArticles);
          }
        }
      );
      this.BarChart();
    });
  }

  RadarChart() {
    const data = {
      labels: this.lstLabel,
      datasets: [
        {
          label:
            'Percentage of total articles compared to the entire faculty (%)',
          data: this.lstPercenArticle,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#71b657',
            '#e3632d',
            '#6c757d',
          ],
          hoverOffset: 4,
        },
      ],
    };

    this.radarChart = new Chart('radarChart', {
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

  LineChart() {
    const data = {
      labels: this.lstLabel,
      datasets: [
        {
          label:
            'Percentage of total contributors compared to the entire faculty (%)',
          data: this.lstPercenContributor,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            '#71b657',
            '#e3632d',
            '#6c757d',
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
        labels: this.lstLabel,
        datasets: [{
          label: 'Num of Contributors',

          data: this.lstContributor,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
          ],
          borderWidth: 1
        },
        {
          label: 'Num of Articles',

          data: this.lstArticle,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        }
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
    this.labelChart = 'Mix';
    this.displayBarChart = 'block';
    this.displayLineChart = 'none';
    this.displayRadarChart = 'none';
    this.BarChart();
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
    this.labelChart = 'Contributor';
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
    this.labelChart = 'Article';
    this.displayRadarChart = 'block';
    this.displayBarChart = 'none';
    this.displayLineChart = 'none';
    this.RadarChart();
  }
}
