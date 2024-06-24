import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-manager-view-article',
  templateUrl: './manager-view-article.component.html',
  styleUrls: ['./manager-view-article.component.css']
})
export class ManagerViewArticleComponent implements OnInit{
  facultyId: number = 0;
  lstContribution: any[] = [];
  baseImgUrl: string = 'https://localhost:7195/Imgs/';
  pageSize = 5;
  currentPage = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) =>{
      this.facultyId =+ param['id'];
      this.articleService.getContributionByFacltyId(this.facultyId).subscribe(data =>{
        this.lstContribution = data;
        console.table(this.lstContribution);
      })
    })
  }
}
