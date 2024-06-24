import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { FacultyService } from 'src/app/services/faculty.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit{

  createForm!: FormGroup
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

  public selectFaculty : number = 0;
  public facultyName : string = "";

  public roleName : string = "";
  public selectRole : number = 0

  lstFaculties : any = [];
  lstRoles : any = [];

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private facultyAPI:FacultyService,
    private roleAPI : RoleService,
    private route : Router,
    private toast:ToastrService
  ){}

  ngOnInit(): void {
    this.getAllFaculties();
    this.getAllRoles();

    this.createForm = this.fb.group({
      user_username:['', Validators.required],
      user_email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      user_password: ['', Validators.required],
      user_confirmPassword: ['', Validators.required],
      // user_birthday: ['', Validators.required],
      user_faculty: [''],
      // user_gender: ['', Validators.required],
      user_role: [''],
    })
  }

  getAllFaculties(){
    this.facultyAPI.getAllFaculty().subscribe(data => {
      this.lstFaculties = data;
    })
  }

  getAllRoles(){
    this.roleAPI.getAllRole().subscribe(data => {
      this.lstRoles = data;
    })
  }

  onSelectFaculty(event:any):void{
    this.selectFaculty = event.target.value;
    // this.facultyAPI.getFacultyID(this.facultyName).subscribe(data => {
    //   this.selectFaculty = data;
    // });
  };

  onSelectRole(event:any){
    this.selectRole = event.target.value;
    // this.roleAPI.getRoleID(this.roleName).subscribe(data => {
    //   this.selectRole = data;
    // })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onCreate(){
    if(this.createForm.valid){
      const userObj = {
        user_username: this.createForm.get('user_username')?.value,
        user_email: this.createForm.get('user_email')?.value,
        user_password: this.createForm.get('user_password')?.value,
        user_confirm_password: this.createForm.get('user_confirmPassword')?.value,
        // user_gender: this.createForm.get('user_gender')?.value,
        // role : {"role_id": this.selectRole, "role_name": this.roleName},
        // faculties : { "faculty_id": this.selectFaculty, "faculty_name": this.facultyName}
        user_role_id: this.selectRole,
        user_faculty_id: this.selectFaculty
      }

      console.log(userObj);

      this.auth.createUser(userObj).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center',
        });
        this.createForm.reset();
        this.route.navigate(['/Admin-Account']);
      },
      error => {
        this.toast.error(error.error.message, 'Error!', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center',
        });
      });
    }
    else{
      ValidateForm.ValidateAllFormFileds(this.createForm);
      this.toast.warning("Please, enter the required fields to register", 'Warning!', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
      })
    }
  }

}
