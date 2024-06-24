import { RoleService } from 'src/app/services/role.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-update-account',
  templateUrl: './admin-update-account.component.html',
  styleUrls: ['./admin-update-account.component.css']
})
export class AdminUpdateAccountComponent implements OnInit {
  thisUserName: string = "";
  userName: string = "";
  userProfile: any;
  lstFaculties: any;
  lstRoles: any;
  profileForm!: FormGroup;
  fileImg!: File;
  imageUrl: string | ArrayBuffer = '';
  selectFaculty: number = 0;
  selectRole: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userStoreService: UserStoreService,
    private userService: UserService,
    private facultyService: FacultyService,
    private roleService: RoleService,
    private toastrService: ToastrService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.userStoreService.getFullNameFromStore().subscribe(res => {
      let userNameFromToken = this.userService.getFullNameFormToken();
      this.thisUserName = res || userNameFromToken;
    });

    this.activatedRouter.params.subscribe((params) => {
      this.userName = params['userName'];
    })

    this.getUserProfile(this.userName);
    this.getAllFaculty();
    this.getAllRole();
    this.profileForm = this.formBuilder.group({
      user_username: ['', Validators.required],
      user_email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
        ],
      ],
      user_faculty: ['', Validators.required],
      user_role: ['', Validators.required],
      user_status: ['', Validators.required]
    });
  }
  getUserProfile(userName: string) {
    this.userService.getUserProfile(userName).subscribe(data => {
      this.userProfile = data;
      this.selectFaculty = this.userProfile.user_faculty_id;
      this.selectRole = this.userProfile.user_role_id;
      this.imageUrl = "https://localhost:7195/Imgs/" + this.userProfile.user_avatar;
      console.table(this.userProfile);
      this.profileForm.patchValue({
        user_username: this.userProfile.user_username,
        user_email: this.userProfile.user_email,
        user_faculty: this.userProfile.faculty_name,
        user_role: this.userProfile.role_name,
        user_status: this.userProfile.user_status
      });
    })
  }
  getAllFaculty() {
    this.facultyService.getAllFaculty().subscribe(data => {
      this.lstFaculties = data;
      console.log(this.lstFaculties);
    })
  }
  getAllRole() {
    this.roleService.getAllRole().subscribe(data => {
      this.lstRoles = data;
      console.log(this.lstRoles)
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.fileImg = event.target.files[0];
      };
      reader.readAsDataURL(file);
    }
  }
  onSelectFaculty(event: any): void {
    this.selectFaculty = event.target.value;
  };

  onSelectRole(event: any) {
    this.selectRole = event.target.value;
  }
  onClick() {
    if (this.profileForm.valid) {
      const formData: FormData = new FormData();
      formData.append('userId', this.userProfile.user_id);
      formData.append('userName', this.profileForm.get('user_username')?.value);
      formData.append('userEmail', this.profileForm.get('user_email')?.value);
      formData.append('userFaculty', this.selectFaculty.toString());
      formData.append('userRole', this.selectRole.toString());
      formData.append('userStatus', this.profileForm.get('user_status')?.value);
      if (this.fileImg != null) {
        formData.append('uploadImage', this.fileImg, this.fileImg.name);
      }
      this.userService.updateProfile(formData).subscribe((res) => {
        if(this.userName===this.thisUserName){
          this.userService.storeToken(res.accessToken);

          this.userService.storeRefreshToken(res.refreshToken);

          const tokenPayload = this.userService.decodedToken();
          this.userStoreService.setFullNameForStore(tokenPayload.unique_name);
          this.userStoreService.setRoleForStore(tokenPayload.role);

          this.userStoreService.getFullNameFromStore().subscribe(res => {
            let userNameFromToken = this.userService.getFullNameFormToken();
            this.userName = res || userNameFromToken;
            this.getUserProfile(this.userName);
          });
        }
        this.toastrService.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(["/Admin-Account"]);
      }, (err) => {
        this.toastrService.error(err.error.message, 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      }
      )
    }
    else{
      Object.keys(this.profileForm.controls).forEach((field) => {
        const control = this.profileForm.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        }
      });
    }
  }
}
