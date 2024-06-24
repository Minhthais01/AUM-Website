import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-guest-view-article-detail',
  templateUrl: './guest-view-article-detail.component.html',
  styleUrls: ['./guest-view-article-detail.component.css']
})
export class GuestViewArticleDetailComponent implements OnInit{
  articleID: number = 0;
  contribution: any
  htmlContent: any

  constructor(
    private activatedRouter: ActivatedRoute,
    private articleService: ArticleService
  ) {
  }
  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.articleID = +params['id'];
      this.getArticleContent(this.articleID);
    });
  }
  
  getArticleContent(contribution_id: number) {
    this.articleService.getArticleContent(contribution_id).subscribe((data: any) => {
      this.contribution = data.result;
      this.htmlContent = this.contribution.contribution_content;
      console.table(this.contribution);
    });
  }
}
