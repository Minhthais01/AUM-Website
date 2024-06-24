import { FacultyService } from 'src/app/services/faculty.service';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit{
  baseImgUrl: string = 'https://localhost:7195/Imgs/';
  public lstArticle : any = [];
  public lstFaculty: any = [];
  pageSize = 5;
  currentPage = 1;

  constructor(
    private article:ArticleService,
    private facultyService: FacultyService,
  ){}

  ngOnInit(): void {
    this.getAllFaculty();
  }

  getAllFaculty(){
    this.article.GetContributionByFaculty().subscribe(data =>{
      this.lstFaculty = data;
      console.table(this.lstFaculty);
    })
  }

  
}
