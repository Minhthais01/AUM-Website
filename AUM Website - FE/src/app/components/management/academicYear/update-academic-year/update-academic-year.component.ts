import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import * as moment from 'moment';
import { AcademicYearService } from 'src/app/services/academic-year.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-academic-year',
  templateUrl: './update-academic-year.component.html',
  styleUrls: ['./update-academic-year.component.css']
})
export class UpdateAcademicYearComponent {
  updateAcademicForm!: FormGroup
  academic_id: any;
  academic:any = {};

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private addAcademicYear: AcademicYearService,
    private activatedRouter: ActivatedRoute,
    private route: Router
    ){
  }

  ngOnInit(): void {
    this.updateAcademicForm = this.fb.group({
      academic_year_title:['', Validators.required],
      academic_Year_startClosureDate:['', Validators.required],
      academic_Year_endClosureDate:['', Validators.required]
    })

    this.activatedRouter.params.subscribe(
      (res) =>{
        this.academic_id = +res['id']
        this.addAcademicYear.getAcademicYear(this.academic_id).subscribe(
          (res) => {
            this.academic = res;
            //log
            // console.log(this.academic);
            this.updateAcademicForm.patchValue({
              academic_year_title:this.academic.academic_year_title,
              academic_Year_startClosureDate:format(this.academic.academic_year_ClosureDate, 'yyyy-MM-dd'),
              academic_Year_endClosureDate:format(this.academic.academic_year_FinalClosureDate, 'yyyy-MM-dd')
            })
          },
          (err) =>{
            console.log("error")
          }
        )
      }
    )
  }

  updateAcademic(){
    if(this.updateAcademicForm.valid){
      const startClosureDate = moment(new Date(this.updateAcademicForm.get('academic_Year_startClosureDate')?.value)).format('YYYY-MM-DDTHH:mm:ss');
      const endClosureDate = moment(new Date(this.updateAcademicForm.get('academic_Year_endClosureDate')?.value)).format('YYYY-MM-DDTHH:mm:ss');
      const title = this.updateAcademicForm.get('academic_year_title')?.value;
      // console.log(startClosureDate);
      // console.log(endClosureDate);
      let academicYear = {
        academic_year_id: this.academic_id,
        academic_year_title: title,
        academic_year_ClosureDate: startClosureDate,
        academic_year_FinalClosureDate: endClosureDate
      }
      // console.table(academicYear);
        this.addAcademicYear.updateAcademicYear(academicYear).subscribe(
        (res)=>{
          this.updateAcademicForm.reset();
          this.route.navigate(["Management-AcademicYear"])
        },
        (err) =>{
          console.log(err)
        }
      );
    }
    else{
      Object.keys(this.updateAcademicForm.controls).forEach((field) => {
        const control = this.updateAcademicForm.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        }
      });
    }
  }
}
