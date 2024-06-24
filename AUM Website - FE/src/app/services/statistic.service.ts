import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private baseUrl: string = 'https://localhost:7195/statisticals/';
  constructor(private http: HttpClient) {}

  guestStatistic(academic_year_id: number, username: string) {
    return this.http.get<any>(this.baseUrl + 'guest-statistic', {
      params: { academic_year_id, username },
    });
  }

  chartGuest(username: string) {
    return this.http.get<any>(this.baseUrl + 'chart-guest', {
      params: { username },
    });
  }

  coordinatorStatistic(academic_year_id: number, username: string) {
    return this.http.get<any>(this.baseUrl + 'coordinator-statistic', {
      params: { academic_year_id, username },
    });
  }

  adminStatistic(academic_year_id: number) {
    return this.http.get<any>(this.baseUrl + 'admin-statistic', {
      params: { academic_year_id },
    });
  }

  adminChart() {
    return this.http.get<any>(this.baseUrl + 'chart-admin');
  }

  beforeStatistic(academic_year_id: number) {
    return this.http.get<any>(this.baseUrl + 'before-statistic', {
      params: { academic_year_id },
    });
  }

  afterStatistic(academic_year_id: number) {
    return this.http.get<any>(this.baseUrl + 'after-statistic', {
      params: { academic_year_id },
    });
  }

  statisticalContributionApprovedRejected(academic_id:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}statistical_approve_reject`, {params: {academic_id}});
  }

  statisticalContributionApprovedRejectedChart(academic_id:number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}statistical_approve_reject_chart`, {params: {academic_id}});
  }

  pageBrowserRoleStatistic(
    page_name: string,
    browser_name: string,
    role: string
  ) {
    return this.http.get<any>(this.baseUrl + 'page-browser-role-statistic', {
      params: { page_name, browser_name, role },
    });
  }

  pageChart() {
    return this.http.get<any>(this.baseUrl + 'page-chart');
  }

  browserChart() {
    return this.http.get<any>(this.baseUrl + 'browser-chart');
  }

  roleChart() {
    return this.http.get<any>(this.baseUrl + 'role-chart');
  }
  workDuration(role_id: number) {
    return this.http.get<any>(this.baseUrl + 'work-duration', { params: { user_role_id: role_id.toString() } });
  }
}
