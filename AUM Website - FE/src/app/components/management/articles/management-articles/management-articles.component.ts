import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-management-articles',
  templateUrl: './management-articles.component.html',
  styleUrls: ['./management-articles.component.css']
})
export class ManagementArticlesComponent implements OnInit{
  public lstArticles : any = [];
  public fullname : string = "";
  public pathImg : string = "";
  public pathDoc : string = "";
  pageSize = 5;
  currentPage = 1;

  constructor(
    private article : ArticleService,
    private userStore : UserStoreService,
    private auth : UserService,
    private toast : ToastrService
  ){}

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.getArticle(this.fullname);
  }

  getArticle(username:string) {
    this.article.getAllArticleOfStudent(username).subscribe(data => {
      this.lstArticles = data.reverse();
      this.pathImg = this.article.Img;
      this.pathDoc = this.article.doc;
    },
    error => {
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    })
  }


  deleteContribution(contribution_id : number){
    // if(confirm("Are you sure to delete?")){
      this.article.deleteArticle(contribution_id).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
        this.ngOnInit();
      },
      error => {
        // console.log(error);
        this.toast.error(error.error.message, "Error", {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
    // }
  }
}
