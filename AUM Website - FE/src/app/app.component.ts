import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadService } from './services/load.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { PageViewService } from './services/page-view.service';
import { UserStoreService } from './services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private currentPage: string = '';
  private browser: string = '';
  private accessTime: Date = new Date();
  private duration: number = 0;
  public fullname: any = '';

  title = 'ProjectComp1640';
  isShow: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pageViewService: PageViewService,
    private auth: UserService,
    private userStore: UserStoreService
  ) {
    this.router.events.subscribe((event) => {
      this.userStore.getFullNameFromStore().subscribe((res) => {
        let fullNameFromToken = this.auth.getFullNameFormToken();
        this.fullname = res || fullNameFromToken;
      });
      if (event instanceof NavigationEnd) {
        this.isShow = this.shouldShowHeader();
        if (this.getCurrentPageName.toString().length == 0) {
        } else {
          if (this.currentPage != this.getCurrentPageName.toString()) {
            this.trackPage();
            this.currentPage = this.getCurrentPageName();
            this.browser = this.getBrowserName();
            this.duration = 0;
            this.accessTime = new Date();
          }
        }
      }
    });
  }

  ngOnInit() {}

  private trackPage() {
    this.calculateDuration();
    this.pageViewService
      .addAccessPageBrowser(
        this.currentPage,
        this.browser,
        Math.round(this.duration),
        this.fullname
      )
      .subscribe((res) => {
        console.log('success');
      });
  }
  calculateDuration(): void {
    const currentTime = new Date();
    this.duration = (currentTime.getTime() - this.accessTime.getTime()) / 1000;
  }
  getCurrentPageName(): any {
    const pageName = this.activatedRoute.firstChild?.snapshot.routeConfig?.path;
    return pageName;
  }

  getBrowserName(): string {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf('Firefox') > -1) {
      return 'Mozilla Firefox';
    } else if (
      userAgent.indexOf('Opera') > -1 ||
      userAgent.indexOf('OPR') > -1
    ) {
      return 'Opera';
    } else if (userAgent.indexOf('Trident') > -1) {
      return 'Microsoft Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
      return 'Microsoft Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
      return 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      return 'Safari';
    } else {
      return 'Unknown';
    }
  }

  shouldShowHeader(): boolean {
    const currentPath = this.router.url;
    if (currentPath === '/Welcome' || currentPath === '/') {
      return false;
    }

    return true;
  }
}
