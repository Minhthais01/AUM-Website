import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-viewing',
  templateUrl: './student-viewing.component.html',
  styleUrls: ['./student-viewing.component.css']
})
export class StudentViewingComponent implements OnInit{

  public lstContribution : any = [];

  fullname : string = "";
  role : string = "";

  pathImg : string = "";
  pathDoc : string = "";

  pageSize = 6;
  currentPage = 1;

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

    this.userStore.getRoleFromStore().subscribe(res => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = res || roleFromToken;
    });

    this.userStore.setRoleForStore(this.role);

    if(this.role === "Student"){
      this.getContributionOfStudent(this.fullname);
      this.pathImg = this.article.Img;
      this.pathDoc = this.article.doc;
    }
  }


  getContributionOfStudent(username : string){
    this.article.getAllArticleOfStudent(username).subscribe(data => {
      this.lstContribution = data;
    });
  }
}
