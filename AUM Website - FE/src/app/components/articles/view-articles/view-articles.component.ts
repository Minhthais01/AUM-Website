import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css']
})
export class ViewArticlesComponent implements OnInit{
  public lstArticlePublic : any = [];
  pathImg : string = "";
  pageSize = 5;
  currentPage = 1;
  fullname: any;

  constructor(
    private userStore:UserStoreService,
    private auth:UserService,
    private article:ArticleService
  ){}


  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.getAllArticlesPublic();
  }


  getAllArticlesPublic(){
    this.article.getAllArticleOfStudentInFaculty(this.fullname).subscribe(data => {
      this.lstArticlePublic = data;
      this.pathImg = this.article.Img;
    });
  }
}
