import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl: string = 'https://localhost:7195/api/Roles/';
  constructor(private http: HttpClient) { }

  getAllRole() : Observable<any>{
    return this.http.get<any>(this.baseUrl);
  }

  getRoleID(roleName:string) : Observable<any>{
    return this.http.get<any>(this.baseUrl + 'role_name', {params : {roleName}});
  }

}
