import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private baseUrl : string = 'https://localhost:7195/contribution/';
  Img : string = 'https://localhost:7195/Imgs/';
  doc : string = 'https://localhost:7195/Articles/';

  constructor(private http:HttpClient) { }

  // addNewArticle(file:File, contribution_title: string){
  //   const formData = new FormData()
  //   formData.append("file", file, file.name)
  //   return this.http.post(this.baseUrl+"Add-New-Article", formData, {params: {contribution_title}})
  // }

  getArticleOfStudent(username : string, articleId:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Get-Article-Of-Student?username=${username}&contribution_id=${articleId}`);
  }

  getAllArticleOfStudent(username : string) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Get-All-Article-Of-Student?username=${username}`);
  }

  getAllArticleOfStudentInFaculty(username:string) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetContributionByFaculty?username=${username}`);
  }
  GetContributionByFaculty() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetContributionOfFaculty`)
  }

  getContributionByFacltyId(facultyId : number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetContributionByFacultyId?facultyId=${facultyId}`);
  }

  getArticleById(contribution_id:number) : Observable<any>{
    return this.http.get<any>(this.baseUrl + "contribution_id", {params : {contribution_id}});
  }

  addNewArticle(formdata:any){
    return this.http.post<any>(this.baseUrl+"Add-New-Article", formdata);
  }

  uploadImage(file:any){
    return this.http.post<any>(`${this.baseUrl}uploadFile`, file);
  }

  UpdateArticles(formData:any){
    return this.http.post<any>(this.baseUrl + "Update-Article", formData);
  }

  ViewArticle(contribution_id:number){
    const params = new HttpParams()
    .set('contribution_id', contribution_id);
    return this.http.put<any>(`${this.baseUrl}View`, {}, {params});
  }

  getArticleContent(contribution_id:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Get-Article`, {params : {contribution_id}});
  }

  deleteArticle(contribution_id:number){
    return this.http.delete<any>(`${this.baseUrl}delete-contribution`, {params : {contribution_id}});
  }

  approve(contribution_id:number){
    return this.http.put<any>(`${this.baseUrl}Approve`, {},{params : {contribution_id}});
  }

  reject(contribution_id:number){
    return this.http.put<any>(`${this.baseUrl}Reject`, {}, {params : {contribution_id}});
  }

  getAllArticlesSelected() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Get-All-Articles-Selected`);
  }

  getAllArticlesPublic() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Get-All-Articles-Public`);
  }

  public(contribution_id:number){
    return this.http.put<any>(`${this.baseUrl}Public`, {}, {params : {contribution_id}});
  }

  private(contribution_id:number){
    return this.http.put<any>(`${this.baseUrl}Private`, {}, {params : {contribution_id}});
  }

  downloadOneArticle(contribution_id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}Download-One-Article?contribution_id=${contribution_id}`, { responseType: 'blob' });
  }

  downloadManyArticle(faculty_id: number, academic_year_id:number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}Download-Many-Article?faculty_id=${faculty_id}&acdemic_year_id=${academic_year_id}`, { responseType: 'blob' });
  }

  search(academic_id:number, faculty_id:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}search`, {params: {academic_id, faculty_id}});
  }
}
