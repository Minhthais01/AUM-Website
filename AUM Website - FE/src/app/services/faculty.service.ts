import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private baseUrl: string = 'https://localhost:7195/api/Faculties/';
  constructor(private http: HttpClient) { }

  getAllFaculty() : Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getFacultyID(facultyName:string) : Observable<any>{
    return this.http.get<any>(this.baseUrl + 'faculty_name', {params : {facultyName}});
  }

  getFacultyByID(faculty_id:number){
    return this.http.get<any>(`${this.baseUrl}get-faculty`, {params: {faculty_id}});
  }

  updateFaculty(faculty: any){
    return this.http.post<any>(this.baseUrl+'update-faculty', faculty)
  }

  addFaculty(facultyObj:any){
    return this.http.post<any>(this.baseUrl, facultyObj);
  }

  deleteFaculty(faculty_id:number){
    return this.http.delete<any>(this.baseUrl, {params: {faculty_id}});
  }
}
