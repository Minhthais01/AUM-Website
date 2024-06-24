import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-academic-year',
  templateUrl: './add-academic-year.component.html',
  styleUrls: ['./add-academic-year.component.css']
})
export class AddAcademicYearComponent {
  addAcademicForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private addAcademicYear: AcademicYearService,
    private route: Router,
    private toast:ToastrService
    ){
  }

  ngOnInit(): void {
    this.addAcademicForm = this.fb.group({
      academic_year_title:['', Validators.required],
      academic_Year_ClosureDate:['', Validators.required],
      academic_Year_FinalClosureDate:['', Validators.required]
    })
  }

  addAcademic(){
    if(this.addAcademicForm.valid){
      const ClosureDate = moment(new Date(this.addAcademicForm.get('academic_Year_ClosureDate')?.value)).format('YYYY-MM-DDTHH:mm:ss');
      const finalClosureDate = moment(new Date(this.addAcademicForm.get('academic_Year_FinalClosureDate')?.value)).format('YYYY-MM-DDTHH:mm:ss');

      let academicYear = {
        academic_year_title:this.addAcademicForm.get('academic_year_title')?.value,
        academic_Year_ClosureDate: ClosureDate,
        academic_Year_FinalClosureDate: finalClosureDate
      }

      this.addAcademicYear.addAcademicYear(academicYear).subscribe(
        (res)=>{
          this.toast.success(res.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
          this.addAcademicForm.reset();
          this.route.navigate(["Management-AcademicYear"])
        },
        (err) =>{
          this.toast.error(err.error.message, 'Error', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
        }
      );
    }
    else{
      Object.keys(this.addAcademicForm.controls).forEach((field) => {
        const control = this.addAcademicForm.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        }
      });
    }
  }
}
