import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  fullname : string = "";
  changePassForm !: FormGroup;

  constructor(
    private auth:UserService,
    private userStore:UserStoreService,
    private toast:ToastrService,
    private route:Router,
    private fb:FormBuilder
  ){}

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.changePassForm = this.fb.group({
      password : ['', Validators.required],
      confirmpassword : ['', Validators.required]
    });
  }


  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  changePassword(){
    const password = this.changePassForm.get('password')?.value;
    const confirmPassword = this.changePassForm.get('confirmpassword')?.value;
    this.auth.ChangePass(password, confirmPassword, this.fullname).subscribe(res => {
      this.toast.success(res.message, 'Success', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });

      this.route.navigate(['/View-Articles']);
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
