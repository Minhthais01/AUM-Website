import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/services/faculty.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { AcademicYearService } from 'src/app/services/academic-year.service';
Chart.register(...registerables);

@Component({
  selector: 'app-manager-chart-approval-reject',
  templateUrl: './manager-chart-approval-reject.component.html',
  styleUrls: ['./manager-chart-approval-reject.component.css'],
})
export class ManagerChartApprovalRejectComponent implements OnInit, OnDestroy {
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
  labelChart: string = 'Article';
  barChart: any;
  lineChart: any;
  radarChart: any;
  displayBarChart: string = 'block';
  displayLineChart: string = 'none';
  displayRadarChart: string = 'none';


  public lstAcademic : any = [];
  public lstStatistic : any = [];


  public labels : any = [];
  public rejectData : any = [];
  public approveData : any = [];
  public contributionData : any = [];
  public contributorData : any = [];

  public selectAcademic : number = 0;

  currentYear : any = "";

  constructor(
    private router: Router,
    private statisticAPI:StatisticService,
    private academicAPI:AcademicYearService
  ) {}


  ngOnDestroy(): void {
    if(this.barChart){
      this.barChart.destroy();
    }
  }

  ngOnDestroyReject(): void {
    if(this.radarChart){
      this.radarChart.destroy();
    }
  }

  ngOnDestroyApprove(): void {
    if(this.lineChart){
      this.lineChart.destroy();
    }
  }

  ngOnInit(): void {
    if(this.selectAcademic != 0){
      this.sort(this.selectAcademic);
    }
    else{
      this.sort(this.selectAcademic);
    }

    this.getAllAcademic();
    // this.sort();
    // this.BarChart();
  }

  sort(academic:any){
    this.statisticAPI.statisticalContributionApprovedRejectedChart(academic).subscribe(data => {
      this.lstStatistic = data;

      this.currentYear = data.academic;

      this.lstStatistic.forEach((item: { faculty_name: any; numberContributionRejected: any; numberContributionApproved: any; numberContribution: any; numberContributor: any; academic:any }) => {
        this.labels.push(item.faculty_name);
        this.rejectData.push(item.numberContributionRejected);
        this.approveData.push(item.numberContributionApproved);
        this.contributionData.push(item.numberContribution);
        this.contributorData.push(item.numberContributor);
        this.currentYear = item.academic;
      });

      this.BarChart();
    });
  }

  onSelectChange(value: any){
    this.selectAcademic = value;
    this.ngOnDestroy();
    this.ngOnDestroyReject();
    this.ngOnDestroyApprove();

    this.labels = [];
    this.rejectData = [];
    this.approveData = [];
    this.contributionData = [];
    this.contributorData = [];

    this.ngOnInit();
  }

  getAllAcademic(){
    this.academicAPI.getAllAcademicYear().subscribe(data => {
      this.lstAcademic = data;
    });
  }

  RadarChart() {
    const data = {
      labels: this.labels,
      datasets: [
        {
          label:
            'Approval Rate (%)',
          data: this.approveData,
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
      labels: this.labels,
      datasets: [
        {
          label:
            'Reject Rate (%)',
          data: this.rejectData,
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

    this.lineChart = new Chart('lineChart', {
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
        labels: this.labels,
        datasets: [
          {
            label: 'Num of Reject',

            data: this.rejectData,
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgb(255, 99, 132)'],
            borderWidth: 1,
          },
          {
            label: 'Num of Approval',

            data: this.approveData,
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgb(54, 162, 235)'],
            borderWidth: 1,
          },
          {
            label: 'Total Article',

            data: this.contributionData,
            backgroundColor: ['rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgb(255, 159, 64)'],
            borderWidth: 1,
          },
          {
            label: 'Total Contributors',

            data: this.contributorData,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgb(75, 192, 192)'],
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
    this.labelChart = 'Bar';
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
    this.labelChart = 'Reject Rate';
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
    this.labelChart = 'Approval Rate';
    this.displayRadarChart = 'block';
    this.displayBarChart = 'none';
    this.displayLineChart = 'none';
    this.RadarChart();
  }
}
