import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/account/login/login.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ViewArticlesComponent } from './components/articles/view-articles/view-articles.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { DetailArticlesComponent } from './components/articles/detail-articles/detail-articles.component';
import { ManagementArticlesComponent } from './components/management/articles/management-articles/management-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArticlesComponent } from './components/management/articles/add-articles/add-articles.component';
import { UpdateArticlesComponent } from './components/management/articles/update-articles/update-articles.component';
import { ManagementAcademicYearComponent } from './components/management/academicYear/management-academic-year/management-academic-year.component';
import { AddAcademicYearComponent } from './components/management/academicYear/add-academic-year/add-academic-year.component';
import { UpdateAcademicYearComponent } from './components/management/academicYear/update-academic-year/update-academic-year.component';
import { ManagementFacultyComponent } from './components/management/faculties/management-faculty/management-faculty.component';
import { AddFacultyComponent } from './components/management/faculties/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './components/management/faculties/update-faculty/update-faculty.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CommentViewingComponent } from './components/coordinator/comment/comment-viewing/comment-viewing.component';
import { CommentAddingComponent } from './components/coordinator/comment/comment-adding/comment-adding.component';
import { PublicationViewingComponent } from './components/coordinator/publication/publication-viewing/publication-viewing.component';
import { PublicationDetailComponent } from './components/coordinator/publication/publication-detail/publication-detail.component';
import { AdminStatisticComponent } from './components/admin/admin-statistic/admin-statistic.component';
import { StudentViewingComponent } from './components/student/student-viewing/student-viewing.component';
import { StudentCommentComponent } from './components/student/student-comment/student-comment.component';
import { ManagerHomeComponent } from './components/manager/manager-home/manager-home.component';
import { AdminAccountComponent } from './components/admin/admin-account/admin-account.component';
import { ChangePasswordComponent } from './components/account/changePassword/change-password/change-password.component';
import { StatisticAfterClosingComponent } from './components/manager/statistic-after-closing/statistic-after-closing.component';
import { StatisticBeforeClosingComponent } from './components/manager/statistic-before-closing/statistic-before-closing.component';
import { OldPasswordComponent } from './components/account/changePassword/old-password/old-password.component';
import { CoordinatorStatisticComponent } from './components/coordinator/coordinator-statistic/coordinator-statistic.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { GuestStatisticComponent } from './components/guest/guest-statistic/guest-statistic.component';
import { GuestViewArticleDetailComponent } from './components/guest/guest-view-article-detail/guest-view-article-detail.component';
import { ManagePublishedArticleComponent } from './components/manager/manage-published-article/manage-published-article.component';
import { AboutUsHomeComponent } from './components/aboutUs/about-us-home/about-us-home.component';
import { ManagerStatisticApproveRejectComponent } from './components/manager/manager-statistic-approve-reject/manager-statistic-approve-reject.component';
import { AdminChartApprovalRejectComponent } from './components/charts/admin-chart-approval-reject/admin-chart-approval-reject.component';
import { GuestChartComponent } from './components/charts/guest-chart/guest-chart.component';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { ManagerChartBeforeComponent } from './components/charts/manager-chart-before/manager-chart-before.component';
import { ManagerChartAfterComponent } from './components/charts/manager-chart-after/manager-chart-after.component';
import { CoordinatorChartComponent } from './components/charts/coordinator-chart/coordinator-chart.component';
import { AdminChartPageBrowserComponent } from './components/charts/admin-chart-page-browser/admin-chart-page-browser.component';
import { AdminChartActiveTimeComponent } from './components/charts/admin-chart-active-time/admin-chart-active-time.component';
import { ManagerChartApprovalRejectComponent } from './components/charts/manager-chart-approval-reject/manager-chart-approval-reject.component';
import { AdminStatisticAtiveTimeComponent } from './components/admin/admin-statistic-ative-time/admin-statistic-ative-time.component';
import { AdminStatisticPageBrowserComponent } from './components/admin/admin-statistic-page-browser/admin-statistic-page-browser.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManagerViewArticleComponent } from './components/manager/manager-view-article/manager-view-article.component';
import { AdminUpdateAccountComponent } from './components/admin/admin-update-account/admin-update-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ViewArticlesComponent,
    CreateAccountComponent,
    DetailArticlesComponent,
    ManagementArticlesComponent,
    AddArticlesComponent,
    UpdateArticlesComponent,
    ManagementAcademicYearComponent,
    AddAcademicYearComponent,
    UpdateAcademicYearComponent,
    ManagementFacultyComponent,
    AddFacultyComponent,
    UpdateFacultyComponent,
    CommentViewingComponent,
    CommentAddingComponent,
    PublicationViewingComponent,
    PublicationDetailComponent,
    AdminStatisticComponent,
    StudentViewingComponent,
    StudentCommentComponent,
    ManagerHomeComponent,
    AdminAccountComponent,
    ChangePasswordComponent,
    StatisticAfterClosingComponent,
    StatisticBeforeClosingComponent,
    OldPasswordComponent,
    CoordinatorStatisticComponent,
    GuestStatisticComponent,
    GuestViewArticleDetailComponent,
    ManagePublishedArticleComponent,
    AboutUsHomeComponent,
    ManagerStatisticApproveRejectComponent,
    AdminChartApprovalRejectComponent,
    GuestChartComponent,
    WelcomeComponent,
    ManagerChartBeforeComponent,
    ManagerChartAfterComponent,
    CoordinatorChartComponent,
    AdminChartPageBrowserComponent,
    AdminChartActiveTimeComponent,
    ManagerChartApprovalRejectComponent,
    AdminStatisticAtiveTimeComponent,
    AdminStatisticPageBrowserComponent,
    ManagerViewArticleComponent,
    AdminUpdateAccountComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxDocViewerModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
