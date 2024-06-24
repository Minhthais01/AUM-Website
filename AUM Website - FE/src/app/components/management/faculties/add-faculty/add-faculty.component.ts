import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { FacultyService } from 'src/app/services/faculty.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent {
  addFacultyForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private facultyAPI:FacultyService,
    private toast:ToastrService
    ){
  }

  ngOnInit(): void {
    this.addFacultyForm = this.fb.group({
      faculty_name:['', Validators.required]
    })
  }

  onCreate(){
    if(this.addFacultyForm.valid){
      this.facultyAPI.addFaculty(this.addFacultyForm.value).subscribe(res => {
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
      ValidateForm.ValidateAllFormFileds(this.addFacultyForm);
      this.toast.warning("Please enter all field to add", 'Warning', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    }
  }
}
