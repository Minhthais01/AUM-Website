import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-manager-chart-before',
  templateUrl: './manager-chart-before.component.html',
  styleUrls: ['./manager-chart-before.component.css']
})
export class ManagerChartBeforeComponent implements OnInit{

//Color
red: string = '#ff014fff';
white: string = 'white'
//Button
idButtonBar: string = 'btn-readMore1'
idButtonLine: string = 'btn-readMore'
idButtonRadar: string = 'btn-readMore'
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
) {}

ngOnInit(): void {
  this.BarChart();
}

// Chart functions
RadarChart(){
  this.radarChart =  new Chart("radarLineChart", {
    type: 'radar',
    data: {
      labels: ['IT', 'Business', 'Graphic Design', 'Engineering', 'Law', 'Art'],
      datasets: [{
        label: 'Num of Contributors',

        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      },
      {
        label: 'Num of Articles',
  
        data: [10, 12, 13, 15, 12, 13],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
  
      }

    ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }

  LineChart(){
    this.radarChart =  new Chart("lineChart", {
      type: 'line',
      data: {
        labels: ['IT', 'Business', 'Graphic Design', 'Engineering', 'Law', 'Art'],
        datasets: [{
          label: 'Num of Contributors',
  
          data: [12, 19, 3, 5, 2, 3],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        },
        {
          label: 'Num of Articles',
    
          data: [10, 12, 13, 15, 12, 13],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
    
        }
  
      ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    }

  BarChart(){
    this.barChart =  new Chart("barChart", {
      type: 'bar',
      data: {
        labels: ['IT', 'Business', 'Graphic Design', 'Engineering', 'Law', 'Art'],
        datasets: [{
          label: 'Num of Contributors',
  
          data: [12, 19, 3, 5, 2, 3],
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
    
          data: [10, 12, 13, 15, 12, 13],
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
            beginAtZero: true
          }
        }
      }
    });
  }

  

  //Click Events

  onPage(){
    this.router.navigate(['/View-ManagerBeforeClosing']);
  }

  onBar(){
    this.idButtonBar= 'btn-readMore1'
    this.idButtonLine= 'btn-readMore'
    this.idButtonRadar= 'btn-readMore'
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

  onLine(){
    this.idButtonLine= 'btn-readMore1'
    this.idButtonBar= 'btn-readMore'
    this.idButtonRadar= 'btn-readMore'
    this.buttonLineLetter = this.white;
    this.buttonLineBackground = this.red;
    this.buttonBarLetter = this.red;
    this.buttonBarBackground = this.white;
    this.buttonRadarLetter = this.red;
    this.buttonRadarBackground = this.white;
    this.labelChart = 'Line';
    this.displayLineChart = 'block';
    this.displayBarChart = 'none';
    this.displayRadarChart = 'none';
    this.LineChart();
  }

  onRadar(){
    this.idButtonRadar= 'btn-readMore1'
    this.idButtonBar= 'btn-readMore'
    this.idButtonLine= 'btn-readMore'
    this.buttonRadarLetter = this.white;
    this.buttonRadarBackground =  this.red;
    this.buttonLineLetter = this.red;
    this.buttonLineBackground = this.white;
    this.buttonBarLetter = this.red;
    this.buttonBarBackground = this.white;
    this.labelChart = 'Radar';
    this.displayRadarChart = 'block';
    this.displayBarChart = 'none';
    this.displayLineChart = 'none';
    this.RadarChart();
  }
}

