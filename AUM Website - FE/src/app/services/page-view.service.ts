import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PageViewService {
  private baseUrl: string = 'https://localhost:7195/page-view/';
  private userPayLoad: any;

  constructor(private http: HttpClient, private router: Router) {}

  addAccessPageBrowser(
    page_view_name: string,
    browser_name: string,
    total_time_access: number,
    username: string
  ) {
    return this.http.post<any>(
      this.baseUrl + 'add-page-view',
      {},
      {
        params: { page_view_name, browser_name, total_time_access, username },
      }
    );
  }

  getAllPageBrowseRole(){
    return this.http.get<any>(this.baseUrl+'get-all-page-browse-role')
  }
}
