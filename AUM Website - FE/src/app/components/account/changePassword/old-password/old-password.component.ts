import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-old-password',
  templateUrl: './old-password.component.html',
  styleUrls: ['./old-password.component.css']
})
export class OldPasswordComponent implements OnInit{
  fullname : string = "";

  passwodField !: FormGroup


  constructor(
    private auth:UserService,
    private userStore:UserStoreService,
    private toast:ToastrService,
    private route:Router,
    private fb : FormBuilder
  ){}

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.passwodField = this.fb.group({
      password : ['', Validators.required]
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

  checkOldPass(){
    const password = this.passwodField.get('password')?.value;
    this.auth.CheckOldPass(this.fullname, password).subscribe(res => {
      this.route.navigate(['/Change-Password']);
    },
    error => {
      this.toast.error(error.error.message, 'Error', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center'
      });
    })
  }
}
