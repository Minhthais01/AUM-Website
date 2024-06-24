import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-comment',
  templateUrl: './student-comment.component.html',
  styleUrls: ['./student-comment.component.css']
})
export class StudentCommentComponent implements OnInit{
  articleID: number = 0;
  userName : string = "";
  contribution: any
  htmlContent: any
  public lstcomment : any = [];
  commentId: number = 0;
  commentContent : string = "";
  userID: any;
  public deadline : boolean = true;

  constructor(
    private userStoreService:UserStoreService,
    private userService:UserService,
    private activatedRouter: ActivatedRoute,
    private articleService: ArticleService,
    private commentService:CommentService,
    private toast:ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.userStoreService.getFullNameFromStore().subscribe(res => {
      let userNameFromToken = this.userService.getFullNameFormToken();
      this.userName = res || userNameFromToken;
    });

    this.userService.getUserID(this.userName).subscribe(res=>{
      this.userID = res;
    })

    this.activatedRouter.params.subscribe((params) => {
      this.articleID = +params['id'];
      this.getComment(this.articleID);
      this.GetArticleByUsername(this.userName,this.articleID);
    });
  }

  //ok
  GetArticleByUsername(userName: string, contribution_id: number) {
    this.articleService.getArticleOfStudent(userName, contribution_id).subscribe((data: any) => {
      this.contribution = data.result;
      this.htmlContent = this.contribution.contribution_content;
      // console.table(this.contribution);
    });
  }

  getComment(contribution_id:number){
    this.commentService.getcomment(contribution_id).subscribe(data => {
      this.lstcomment = data;
      console.table(this.lstcomment);
    });
  }

  sendComment(){
    if(this.commentId != 0){
      this.commentService.updateComment(this.articleID, this.commentId, this.commentContent).subscribe(res =>{
        this.ngOnInit();
        this.commentId = 0;
        this.commentContent = "";
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
      this.commentService.addComment(this.commentContent, this.userName, this.articleID).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });

        this.ngOnInit();
        this.commentContent = "";
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
      this.commentService.deleteComment(this.articleID, comment_id).subscribe(res => {
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
    this.commentContent = comment_content;
  }
}
