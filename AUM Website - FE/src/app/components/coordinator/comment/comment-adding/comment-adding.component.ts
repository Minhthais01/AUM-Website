import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-adding',
  templateUrl: './comment-adding.component.html',
  styleUrls: ['./comment-adding.component.css']
})
export class CommentAddingComponent implements OnInit{
  public lstcomment : any = [];
  contributionID : number = 0;
  commentId : number = 0;
  commentcontent : string = "";
  fullname : string = "";
  userID: any;
  contribution: any;
  htmlContent: any;

  public deadline : boolean = true;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private userStore:UserStoreService,
    private auth:UserService,
    private comment:CommentService,
    private toast:ToastrService,
    private articleService: ArticleService
  ){}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params) => {
      this.contributionID = +params['id'];
      this.getComment(this.contributionID);
      this.getArticleContent(this.contributionID);
    });

    this.userStore.getFullNameFromStore().subscribe(res => {
      let getFullNameFormToken = this.auth.getFullNameFormToken();
      this.fullname = res || getFullNameFormToken;
    });

    this.auth.getUserID(this.fullname).subscribe(res=>{
      this.userID = res;
    })
  }

  getArticleContent(contribution_id: number) {
    this.articleService.getArticleContent(contribution_id).subscribe((data: any) => {
      this.contribution = data.result;
      this.htmlContent = this.contribution.contribution_content;
      // console.table(this.contribution);
    });
  }

  getComment(contribution_id:number){
    this.comment.getcomment(contribution_id).subscribe(data => {
      this.lstcomment = data;
    });
  }

  sendComment(){
    if(this.commentId != 0){
      this.comment.updateComment(this.contributionID, this.commentId, this.commentcontent).subscribe(res =>{
        this.ngOnInit();
        this.commentId = 0;
        this.commentcontent = "";
      },
      err => {
        this.toast.error(err.error.message, 'Comment was not successful. ', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
    }
    else{
      this.comment.addComment(this.commentcontent, this.fullname, this.contributionID).subscribe(res => {
        this.ngOnInit();
        this.commentcontent = "";
      },
      error => {
        this.toast.error(error.error.message, 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
    }
  }

  deleteComment(comment_id:number){
    if(confirm("Are you sure to delete?")){
      this.comment.deleteComment(this.contributionID, comment_id).subscribe(res => {
        this.commentId = 0;
        this.ngOnInit();
      },
      error => {
        this.toast.error(error.error.message, "Error", {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
    }
  }

  getCommentToUpdate(comment_id:number, comment_content:any){
    // console.log(comment_id);
    // console.log(comment_content);
    this.commentId = comment_id;
    this.commentcontent = comment_content;
  }
}
