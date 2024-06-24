import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { ArticleService } from 'src/app/services/article.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-manage-published-article',
  templateUrl: './manage-published-article.component.html',
  styleUrls: ['./manage-published-article.component.css']
})
export class ManagePublishedArticleComponent implements OnInit {
  public lstArticles: any = [];
  pathImg: string = "";
  status: string = "Pending";
  lstFaculties: any = [];
  public selectedFaculty: number = 0;
  lstAcademicYears: any = [];
  public selectedAcademicYear: number = 0;
  zipFile: any;
  contribution_id: number = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private article: ArticleService,
    private toast: ToastrService,
    private facultyAPI: FacultyService,
    private academicService: AcademicYearService
  ) { }

  ngOnInit(): void {
    if(this.selectedAcademicYear != 0 && this.selectedFaculty != 0){
      this.search(this.selectedAcademicYear, this.selectedFaculty);
    }
    else if(this.selectedAcademicYear == 0 && this.selectedFaculty != 0){
      this.search(this.selectedAcademicYear, this.selectedFaculty);
    }
    else if(this.selectedAcademicYear != 0 && this.selectedFaculty == 0){
      this.search(this.selectedAcademicYear, this.selectedFaculty);
    }
    else{
      this.getArticle();
      this.getAllFaculties();
      this.getAllAcademicYears();
    }
    // console.log(this.selectedAcademicYear);
    // console.log(this.selectedFaculty);
  }

  search(academic_id:number, faculty_id:number){
    this.article.search(academic_id, faculty_id).subscribe(data => {
      this.lstArticles = data;
    });
  }

  onAcademicChange(newValue: number) {
    this.selectedAcademicYear = newValue;
    this.ngOnInit();
  }

  onFacultyChange(newValue:number){
    this.selectedFaculty = newValue;
    this.ngOnInit();
  }

  getAllFaculties() {
    this.facultyAPI.getAllFaculty().subscribe(data => {
      this.lstFaculties = data.filter((faculty: any) => faculty.faculty_name !== 'None');
      // console.table(this.lstArticles);
    });
  }
  onSelectFaculty(event: any): void {
    this.selectedFaculty = event.target.value;
    // console.log(this.selectedFaculty);
  };

  getAllAcademicYears() {
    this.academicService.getAllAcademicYear().subscribe(data => {
      this.lstAcademicYears = data;
      // console.table(this.lstAcademicYears);
    });
  }
  onSelectAcademicYear(event: any): void {
    this.selectedAcademicYear = event.target.value;
    // console.log(this.selectedAcademicYear);
  }

  getArticle() {
    this.article.getAllArticlesSelected().subscribe(data => {
      this.lstArticles = data;
      // console.table(this.lstArticles);
      this.pathImg = this.article.Img;
    });
  }

  downLoadOneAriticle(contribution_id:number) {
    this.article.downloadOneArticle(contribution_id).subscribe((data: Blob) => {
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Download.zip';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, (error) => {
      console.error('Error downloading article:', error);
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    });
  }

  downLoadManyAriticle() {
    this.article.downloadManyArticle(this.selectedFaculty, this.selectedAcademicYear).subscribe((data: Blob) => {
      // console.log(this.selectedAcademicYear);
      // console.log('Downloaded file:', data);
      const blobUrl = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Download.zip';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, (error) => {
      console.error('Error downloading article:', error);
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    });
  }

  Public(contribution_id: number) {
    this.article.public(contribution_id).subscribe(res => {
      this.status = "Public";
      this.ngOnInit();
    },
      error => {
        this.toast.error(error.error.message, 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
  }

  Private(contribution_id: number) {
    this.article.private(contribution_id).subscribe(res => {
      this.status = "Private";
      this.ngOnInit();
    },
      error => {
        this.toast.error(error.error.message, 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
  }

}
