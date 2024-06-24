import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl: string = 'https://localhost:7195/api/Comments/';

  constructor(private http: HttpClient) { }

  getcomment(comment_contribution_id:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}`, {params : {comment_contribution_id}});
  }

  addComment(content:string, username:string, contribution_id:number){
    const params = new HttpParams()
    .set('content', content)
    .set('username', username)
    .set('contribution_id', contribution_id)
    return this.http.post<any>(`${this.baseUrl}`, {}, {params});
  }

  deleteComment(contribution_id: number, comment_id: number) {
    return this.http.delete<any>(`${this.baseUrl}`, { params: { contribution_id, comment_id } });
  } 

  updateComment(contribution_id:number, comment_id:number, commentcontent:string){
    const params = new HttpParams()
    .set('comment_id', comment_id)
    .set('comments_content', commentcontent)
    .set('contribution_id', contribution_id)
    return this.http.post<any>(`${this.baseUrl}Update-Comment`, {}, {params});
  }
}
