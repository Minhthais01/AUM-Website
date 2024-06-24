import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService {

  private baseUrl: string = 'https://localhost:7195/academic-years/'
  constructor(private http : HttpClient) { }

  getAllAcademicYear(){
    return this.http.get(this.baseUrl)
  }

  getAcademicYear(academic_year_id: number){
    return this.http.get(this.baseUrl+"get-academic-year", {params: {academic_year_id}})
  }

  addAcademicYear(academic_Years:any){
    return this.http.post<any>(this.baseUrl+'add-academic-year', academic_Years)
  }

  updateAcademicYear(academicYears:any){
    return this.http.post<any>(this.baseUrl+'update-academic-year', academicYears)
  }

  deleteAcademicYear(academic_year_id:number){
    return this.http.delete<any>(`${this.baseUrl}`, {params : {academic_year_id}});
  }
}
