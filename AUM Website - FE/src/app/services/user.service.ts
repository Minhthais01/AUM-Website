// import { Injectable } from '@angular/core';

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from "@angular/router";
import { TokenApiModel } from "../Models/token-api.model";
import { Observable, interval } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'https://localhost:7195/api/Users/';
  private userPayLoad: any;

  public timerActive: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayLoad = this.decodedToken();
  }

  createUser(user: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.baseUrl}Register`, user, { headers });
  }

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post<any>(`${this.baseUrl}Login`, {}, { params });
  }

  totalWorkDuration(time:number, username:string){
    const params = new HttpParams()
    .set('time', time)
    .set('username', username);

    return this.http.post<any>(`${this.baseUrl}add-total-work-duration`, {}, {params});
  }

  signOut() {
    localStorage.clear();
    this.timerActive = false;
    this.router.navigate(['login']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodedToken() {
    const jwt = new JwtHelperService();
    const token = this.getToken()!;

    return jwt.decodeToken(token);
  }

  getAllAccount(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(this.baseUrl, { headers });
  }

  getFullNameFormToken() {
    if (this.userPayLoad) {
      return this.userPayLoad.unique_name;
    }
  }

  getRoleFromToken() {
    if (this.userPayLoad) {
      return this.userPayLoad.role;
    }
  }

  renewToken(tokenApi: TokenApiModel) {
    return this.http.post<any>(`${this.baseUrl}refresh`, tokenApi);
  }

  CheckOldPass(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.put<any>(
      `${this.baseUrl}check-old-password`,
      {},
      { params }
    );
  }

  ChangePass(password: string, confirmpassword: string, username: string) {
    const params = new HttpParams()
      .set('newPass', password)
      .set('conPass', confirmpassword)
      .set('username', username);

    return this.http.put<any>(`${this.baseUrl}ChangePassword`, {}, { params });
  }

  getUserID(user_username: string) {
    return this.http.get(`${this.baseUrl}get-user-id`, {
      params: { user_username },
    });
  }
  getUserProfile(user_username: string) {
    return this.http.get(`${this.baseUrl}Get-User-By-UserName`, {
      params: { user_username },
    });
  }
  updateProfile(formdata: any) {
    return this.http.post<any>(this.baseUrl + 'Update-User-Profile', formdata);
  }

  getLastLogin(username: string) {
    return this.http.get<any>(this.baseUrl + 'last-login', {
      params: { username },
    });
  }

  addLastLogin(username: string) {
    return this.http.post<any>(
      this.baseUrl + 'add-last-login',
      {},
      { params: { username } }
    );
  }
}
