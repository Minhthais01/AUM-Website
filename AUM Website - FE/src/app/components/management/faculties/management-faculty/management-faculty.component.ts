import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-management-faculty',
  templateUrl: './management-faculty.component.html',
  styleUrls: ['./management-faculty.component.css']
})
export class ManagementFacultyComponent implements OnInit{
  public lstFaculty : any = [];
  pageSize = 5;
  currentPage = 1;

  constructor(
    private facultyAPI:FacultyService,
    private toast:ToastrService
  ){}


  ngOnInit(): void {
    this.getAllFaculty();
  }

  getAllFaculty(){
    this.facultyAPI.getAllFaculty().subscribe(data => {
      this.lstFaculty = data;
    });
  }

  deleteFaculty(faculty_id:number){
    if(confirm("Are you sure to delete?")){
      this.facultyAPI.deleteFaculty(faculty_id).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });

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
}
