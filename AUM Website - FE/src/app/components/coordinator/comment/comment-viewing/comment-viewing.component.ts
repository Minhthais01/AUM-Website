import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-viewing',
  templateUrl: './comment-viewing.component.html',
  styleUrls: ['./comment-viewing.component.css']
})
export class CommentViewingComponent implements OnInit{
  public lstArticle : any = [];
  fullname : string = "";
  role : string = "";
  pathImg : string = "";
  pathDoc : string = "";
  pageSize = 5;
  currentPage = 1;

  constructor(
    private article:ArticleService,
    private toast:ToastrService,
    private userStore:UserStoreService,
    private auth:UserService,
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

    if(this.role === "Coordinator"){
      this.getAllArticles(this.fullname);
      this.pathImg = this.article.Img;
      this.pathDoc = this.article.doc;
    }
  }

  getCurrentUser(){

  }

  getAllArticles(username:string){
    this.article.getAllArticleOfStudentInFaculty(username).subscribe(data => {
      this.lstArticle = data;
    });
  }
  downLoadOneAriticle(contribution_id:number) {
    this.article.downloadOneArticle(contribution_id).subscribe((data: Blob) => {
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Download.zip';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, (error) => {
      console.error('Error downloading article:', error);
    });
  }
}
