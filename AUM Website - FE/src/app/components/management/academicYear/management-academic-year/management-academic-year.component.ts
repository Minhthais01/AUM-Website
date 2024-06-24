import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from '../../../../services/academic-year.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-management-academic-year',
  templateUrl: './management-academic-year.component.html',
  styleUrls: ['./management-academic-year.component.css']
})
export class ManagementAcademicYearComponent implements OnInit {
  public academicYears: any = []
  pageSize = 5;
  currentPage = 1;

  constructor(private academicService: AcademicYearService, private toast:ToastrService){}

  ngOnInit(){
      this.academicService.getAllAcademicYear().subscribe(
        (res) => {
          this.academicYears = res;
          console.table(this.academicYears);
        },
        (err) =>{
          console.log("error")
        }
      )
  }

  deleteAcademic(academic_year_id:number){
    if(confirm("Are you sure to delete")){
      this.academicService.deleteAcademicYear(academic_year_id).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
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
}
