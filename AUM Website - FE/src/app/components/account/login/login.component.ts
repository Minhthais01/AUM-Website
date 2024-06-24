import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from '@syncfusion/ej2-angular-charts';
import * as moment from 'moment';
import { Toast, ToastrService } from 'ngx-toastr';
import ValidateForm from 'src/app/Helper/ValidateForm';
import { APIService } from 'src/app/services/api.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  sendEmailForm!: FormGroup;

  resetPasswordEmail!: string;
  isValidEmail!: boolean;

  role: string = '';

  constructor(
    private fb: FormBuilder,
    private api: APIService,
    private router: Router,
    private auth: UserService,
    private userStore: UserStoreService,
    private toast: ToastrService,
    private resetPassword: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const time = Date.now();
    if (this.loginForm.valid) {
      this.auth.login(username, password).subscribe(
        (res) => {
          this.auth.timerActive = true;

          this.loginForm.reset();
          this.auth.storeToken(res.accessToken);

          this.auth.storeRefreshToken(res.refreshToken);

          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);

          this.userStore.getRoleFromStore().subscribe((res) => {
            let roleFromToken = this.auth.getRoleFromToken();
            this.role = res || roleFromToken;
          });

          this.auth
            .getLastLogin(tokenPayload.unique_name)
            .subscribe((respone) => {
              if (respone == null) {
                this.auth
                  .addLastLogin(tokenPayload.unique_name)
                  .subscribe((responeAdd) => {
                    this.toast.success(res.message, 'Success', {
                      timeOut: 3000,
                      progressBar: true,
                      positionClass: 'toast-top-center',
                    });
                    this.router.navigate(['/Welcome']);
                  });
              } else {
                const lastLogin = moment(new Date(respone)).format(
                  'HH:mm yyyy-MM-DD'
                );
                this.auth
                  .addLastLogin(tokenPayload.unique_name)
                  .subscribe((responeAdds) => {
                    this.toast.success(`Last login: ${lastLogin}`, 'Success', {
                      timeOut: 3000,
                      progressBar: true,
                      enableHtml: true,
                      positionClass: 'toast-top-center',
                    });
                    if (this.role === 'Admin') {
                      this.router.navigate(['/Admin-Statistic']);
                    } else if (this.role === 'Coordinator') {
                      this.router.navigate(['/View-Comment']);
                    } else if (this.role === 'Student') {
                      this.router.navigate(['/View-Student']);
                    } else if (this.role === 'Manager') {
                      this.router.navigate(['/View-ManagerHome']);
                    } else {
                      this.router.navigate(['/View-Articles']);
                    }
                  });
              }
            });
        },
        (error) => {
          this.toast.error(error.error.message, 'Error!', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center',
          });
        }
      );
    } else {
      ValidateForm.ValidateAllFormFileds(this.loginForm);
      this.toast.warning('Please, enter all fields to login', 'Warning!', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
      });
    }
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/;
    this.isValidEmail = pattern.test(value);

    return this.isValidEmail;
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      console.log(this.resetPasswordEmail);

      this.resetPassword
        .sendResetPasswordLink(this.resetPasswordEmail)
        .subscribe({
          next: (res) => {
            this.toast.success(res.message, 'Success', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-center',
            });
            this.resetPasswordEmail = '';
            const buttonRef = document.getElementById('btnClose');
            buttonRef?.click();
          },
          error: (err) => {
            this.toast.error(err.error.message, 'Error!', {
              timeOut: 3000,
              progressBar: true,
              positionClass: 'toast-top-center',
            });
            alert(err.error.message);
          },
        });
    } else {
      alert('err');
    }
  }
}
