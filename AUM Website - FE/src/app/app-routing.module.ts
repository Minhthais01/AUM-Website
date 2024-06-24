import { CoordinatorStatisticComponent } from './components/coordinator/coordinator-statistic/coordinator-statistic.component';
import { StatisticAfterClosingComponent } from './components/manager/statistic-after-closing/statistic-after-closing.component';
import { StudentViewingComponent } from './components/student/student-viewing/student-viewing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { ResetPasswordComponent } from './components/account/reset-password/reset-password.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { DetailArticlesComponent } from './components/articles/detail-articles/detail-articles.component';
import { ManagementArticlesComponent } from './components/management/articles/management-articles/management-articles.component';
import { AddArticlesComponent } from './components/management/articles/add-articles/add-articles.component';
import { ViewArticlesComponent } from './components/articles/view-articles/view-articles.component';
import { UpdateArticlesComponent } from './components/management/articles/update-articles/update-articles.component';
import { ManagementAcademicYearComponent } from './components/management/academicYear/management-academic-year/management-academic-year.component';
import { AddAcademicYearComponent } from './components/management/academicYear/add-academic-year/add-academic-year.component';
import { UpdateAcademicYearComponent } from './components/management/academicYear/update-academic-year/update-academic-year.component';
import { ManagementFacultyComponent } from './components/management/faculties/management-faculty/management-faculty.component';
import { AddFacultyComponent } from './components/management/faculties/add-faculty/add-faculty.component';
import { UpdateFacultyComponent } from './components/management/faculties/update-faculty/update-faculty.component';
import { CommentViewingComponent } from './components/coordinator/comment/comment-viewing/comment-viewing.component';
import { CommentAddingComponent } from './components/coordinator/comment/comment-adding/comment-adding.component';
import { PublicationViewingComponent } from './components/coordinator/publication/publication-viewing/publication-viewing.component';
import { PublicationDetailComponent } from './components/coordinator/publication/publication-detail/publication-detail.component';
import { AdminStatisticComponent } from './components/admin/admin-statistic/admin-statistic.component';
import { StudentCommentComponent } from './components/student/student-comment/student-comment.component';
import { ManagerHomeComponent } from './components/manager/manager-home/manager-home.component';
import { AdminAccountComponent } from './components/admin/admin-account/admin-account.component';
import { ChangePasswordComponent } from './components/account/changePassword/change-password/change-password.component';
import { StatisticBeforeClosingComponent } from './components/manager/statistic-before-closing/statistic-before-closing.component';
import { OldPasswordComponent } from './components/account/changePassword/old-password/old-password.component';
import { GuestStatisticComponent } from './components/guest/guest-statistic/guest-statistic.component';
import { GuestViewArticleDetailComponent } from './components/guest/guest-view-article-detail/guest-view-article-detail.component';
import { ManagePublishedArticleComponent } from './components/manager/manage-published-article/manage-published-article.component';
import { AboutUsHomeComponent } from './components/aboutUs/about-us-home/about-us-home.component';
import { ManagerStatisticApproveRejectComponent } from './components/manager/manager-statistic-approve-reject/manager-statistic-approve-reject.component';
import { ChartComponent } from '@syncfusion/ej2-angular-charts';
import { AdminChartApprovalRejectComponent } from './components/charts/admin-chart-approval-reject/admin-chart-approval-reject.component';
import { GuestChartComponent } from './components/charts/guest-chart/guest-chart.component';
import { ManagerChartBeforeComponent } from './components/charts/manager-chart-before/manager-chart-before.component';
import { ManagerChartAfterComponent } from './components/charts/manager-chart-after/manager-chart-after.component';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { CoordinatorChartComponent } from './components/charts/coordinator-chart/coordinator-chart.component';
import { AdminStatisticAtiveTimeComponent } from './components/admin/admin-statistic-ative-time/admin-statistic-ative-time.component';
import { AdminStatisticPageBrowserComponent } from './components/admin/admin-statistic-page-browser/admin-statistic-page-browser.component';
import { AdminChartPageBrowserComponent } from './components/charts/admin-chart-page-browser/admin-chart-page-browser.component';
import { AdminChartActiveTimeComponent } from './components/charts/admin-chart-active-time/admin-chart-active-time.component';
import { ManagerChartApprovalRejectComponent } from './components/charts/manager-chart-approval-reject/manager-chart-approval-reject.component';
import { ManagerViewArticleComponent } from './components/manager/manager-view-article/manager-view-article.component';
import { AdminUpdateAccountComponent } from './components/admin/admin-update-account/admin-update-account.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'Reset-Password', component: ResetPasswordComponent},
  {path:'Profile', component: ProfileComponent},
  {path:'View-Articles', component: ViewArticlesComponent},
  // {path:'Detail-Articles/:id', component: DetailArticlesComponent},
  {path:'Detail-Articles/:id', component: DetailArticlesComponent},
  {path:'Create-Account', component: CreateAccountComponent},
  {path:'Management-Articles', component: ManagementArticlesComponent},
  {path:'Add-Articles', component: AddArticlesComponent},
  {path:'Update-Articles/:id', component: UpdateArticlesComponent},
  {path:'Management-AcademicYear', component: ManagementAcademicYearComponent},
  {path:'Add-AcademicYear', component: AddAcademicYearComponent},
  {path:'Update-AcademicYear/:id', component: UpdateAcademicYearComponent},
  {path:'Management-Faculty', component: ManagementFacultyComponent},
  {path:'Add-Faculty', component: AddFacultyComponent},
  {path:'Update-Faculty/:id', component: UpdateFacultyComponent},
  {path:'Old-Password', component:OldPasswordComponent},
  {path:'Change-Password', component:ChangePasswordComponent},

 //Welcome page
 {path:'Welcome', component: WelcomeComponent},


  //About us
  {path:'About-Us', component: AboutUsHomeComponent},

  //Guest
  {path:'Guest-Statistic', component: GuestStatisticComponent},
  {path:'Guest-ViewArticleDetail/:id', component: GuestViewArticleDetailComponent},
  {path:'Guest-Chart', component: GuestChartComponent},



  //Student
  {path:'View-Student', component: StudentViewingComponent},
  {path:'View-StudentArticleDetail/:id', component: StudentCommentComponent},

  //Coordinator
  {path:'View-Comment', component: CommentViewingComponent},
  {path:'Add-Comment/:id', component: CommentAddingComponent},
  {path:'View-Pub', component: PublicationViewingComponent},
  {path:'Detail-Pub/:id', component: PublicationDetailComponent},
  {path:'View-CoordinatorStatistic', component: CoordinatorStatisticComponent},
  {path:'Coordinator-Chart', component: CoordinatorChartComponent},

  //Manager
  {path:'View-ManagerHome', component: ManagerHomeComponent},
  {path:'View-ManagerBeforeClosing', component: StatisticBeforeClosingComponent},
  {path:'View-ManagerAfterClosing', component: StatisticAfterClosingComponent},
  {path:'View-PublishedArticles', component: ManagePublishedArticleComponent},
  {path:'View-StatisticApproveReject', component: ManagerStatisticApproveRejectComponent},
  {path:'Manager-Chart-Before', component: ManagerChartBeforeComponent},
  {path:'Manager-Chart-After', component: ManagerChartAfterComponent},
  {path:'Manager-Chart-AprrovalReject', component: ManagerChartApprovalRejectComponent},
  {path:'Manager-ViewArticle/:id', component: ManagerViewArticleComponent },


  //Admin
  {path:'Admin-Statistic', component: AdminStatisticComponent},
  {path:'Admin-StatisticActiveTime', component: AdminStatisticAtiveTimeComponent},
  {path:'Admin-StatisticPageBrowser', component: AdminStatisticPageBrowserComponent},
  {path:'Admin-Account', component: AdminAccountComponent},
  {path:'Admin-Chart', component: AdminChartApprovalRejectComponent},
  {path:'Admin-ChartPageBrowser', component: AdminChartPageBrowserComponent},
  {path:'Admin-ChartActiveTime', component: AdminChartActiveTimeComponent},
  {path:'Admin-Update-Account/:userName', component: AdminUpdateAccountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
