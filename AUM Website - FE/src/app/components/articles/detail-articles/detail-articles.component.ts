import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/services/article.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-detail-articles',
  templateUrl: './detail-articles.component.html',
  styleUrls: ['./detail-articles.component.css'],
})
export class DetailArticlesComponent implements OnInit{
  fileWord : any;
  articleID : number = 0;
  pathDoc : string = "";
  contribution : any;

  urlDoc: string = `https://view.officeapps.live.com/op/embed.aspx?src=https://localhost:7195/Articles/file-sample_1MB.doc`;
  urlSafe: SafeResourceUrl | undefined

  constructor(
    private articleService:ArticleService,
    private activatedRoute:ActivatedRoute,
    private santizer : DomSanitizer
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.articleID = +params['id'];
      this.getArticleContent(this.articleID);
    });

    this.urlSafe = this.santizer.bypassSecurityTrustResourceUrl(this.urlDoc);
  }

  getArticleContent(article_id: number){
    this.articleService.getArticleContent(article_id).subscribe(data => {
      this.contribution = data;
      this.fileWord = this.contribution.contribution_content;
      // console.table(this.contribution);
    });
  }
}


