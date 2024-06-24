import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userName : string = "";
  userProfile: any;
  profileForm!: FormGroup;
  fileImg!: File;
  imageUrl: string | ArrayBuffer = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userStoreService:UserStoreService,
    private auth: UserService,
    private toast:ToastrService
  ){}

  ngOnInit(): void {
    this.userStoreService.getFullNameFromStore().subscribe(res => {
      let userNameFromToken = this.auth.getFullNameFormToken();
      this.userName = res || userNameFromToken;
      this.getUserProfile(this.userName);
    });

    this.profileForm = this.fb.group({
      user_username:['', Validators.required],
      user_email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'),
        ],
      ],
      user_faculty: ['', Validators.required],
      user_role: ['', Validators.required],
    });
  }

  getUserProfile(userName: string){
    this.auth.getUserProfile(userName).subscribe((data: any) =>{
      this.userProfile = data;
      this.imageUrl = "https://localhost:7195/Imgs/" + this.userProfile.user_avatar;
      console.table(this.userProfile);
      this.profileForm.patchValue({
        user_username: this.userProfile.user_username,
        user_email: this.userProfile.user_email,
        user_faculty: this.userProfile.faculty_name,
        user_role: this.userProfile.role_name
      });
    });
  }

  onClick(){
    if(this.profileForm.valid){
      const formData:FormData = new FormData();
      formData.append('userId',this.userProfile.user_id);
      formData.append('userName',this.profileForm.get('user_username')?.value);
      formData.append('userEmail',this.profileForm.get('user_email')?.value);
      formData.append('userFaculty', this.userProfile.user_faculty_id.toString());
      formData.append('userRole', this.userProfile.user_role_id.toString());
      formData.append('userStatus', this.userProfile.user_status.toString());

      if(this.fileImg != null){
        formData.append('uploadImage', this.fileImg, this.fileImg.name);
      }
      this.auth.updateProfile(formData).subscribe(
        (res)=>{

          this.auth.storeToken(res.accessToken);

          this.auth.storeRefreshToken(res.refreshToken);

          const tokenPayload = this.auth.decodedToken();
          this.userStoreService.setFullNameForStore(tokenPayload.unique_name);
          this.userStoreService.setRoleForStore(tokenPayload.role);

          this.userStoreService.getFullNameFromStore().subscribe(res => {
            let userNameFromToken = this.auth.getFullNameFormToken();
            this.userName = res || userNameFromToken;
            this.getUserProfile(this.userName);
          });

          this.toast.success(res.message, 'Success', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
          this.router.navigate(["/Profile"]);

        },
        (err) =>{
          this.toast.error(err.error.message, 'Error', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });        }
      );
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
}
