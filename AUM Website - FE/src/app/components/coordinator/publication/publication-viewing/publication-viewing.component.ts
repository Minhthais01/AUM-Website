import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-publication-viewing',
  templateUrl: './publication-viewing.component.html',
  styleUrls: ['./publication-viewing.component.css']
})
export class PublicationViewingComponent implements OnInit{
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
    private location : Location
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

  getAllArticles(username:string){
    this.article.getAllArticleOfStudentInFaculty(username).subscribe(data => {
      this.lstArticle = data;
    });
  }

  view(contribution_id:number){
    this.article.ViewArticle(contribution_id).subscribe(res => {
      this.toast.success(res.message, 'Success', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    },
    error => {
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    });
  }

  Approve(contribution_id:number){
    this.article.approve(contribution_id).subscribe(res => {
      this.toast.success(res.message, 'Success', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });

      this.ngOnInit();
    },
    error => {
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    });
  }

  Reject(contribution_id:number){
    this.article.reject(contribution_id).subscribe(res => {
      this.toast.success(res.message, 'Success', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });

      this.ngOnInit();
    },
    error => {
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
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
