import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/services/faculty.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helper/ValidateForm';

@Component({
  selector: 'app-update-faculty',
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css']
})
export class UpdateFacultyComponent {
  updateFacultyForm!: FormGroup
  facultyID : number = 0;

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private updateFaculty: FacultyService,
    private ActivatedRoute:ActivatedRoute,
    private facultyAPI:FacultyService,
    private toast:ToastrService
    ){
  }

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params) => {
      this.facultyID = +params['id'];
      this.getFaculty(this.facultyID);
    })

    this.updateFacultyForm = this.fb.group({
      faculty_id:['', Validators.required],
      faculty_name:['', Validators.required]
    })
  }

  getFaculty(faculty_id:number){
    this.facultyAPI.getFacultyByID(faculty_id).subscribe(data => {
      this.updateFacultyForm.patchValue({
        faculty_id: data.faculty_id,
        faculty_name : data.faculty_name
      });
    });
  }

  onUpdate(){
    if(this.updateFacultyForm.valid){
      this.updateFaculty.updateFaculty(this.updateFacultyForm.value).subscribe(res => {
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
      })
    }
    else{
      ValidateForm.ValidateAllFormFileds(this.updateFacultyForm);
    }
  }
}
