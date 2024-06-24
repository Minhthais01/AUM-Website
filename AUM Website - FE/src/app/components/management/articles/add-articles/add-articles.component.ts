import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-articles',
  templateUrl: './add-articles.component.html',
  styleUrls: ['./add-articles.component.css']
})
export class AddArticlesComponent {
  addArticleForm!: FormGroup
  filetoUpload!: File;
  isChecked: boolean = true;
  fileImg!: File;
  fullname = "";
  imageUrl: string | ArrayBuffer = '';
  currentDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private article: ArticleService,
    private userStore:UserStoreService,
    private toast:ToastrService,
    private route:Router
    ){
  }

  ngOnInit(): void {
    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.addArticleForm = this.fb.group({
      contribution_title:['', Validators.required],
      currentYear:[this.currentDate.getFullYear().toString()]
    })
  }

  onCreate(){
    if(this.addArticleForm.valid){
      const formData:FormData = new FormData();
      formData.append('uploadFile', this.filetoUpload, this.filetoUpload.name);
      formData.append('username',this.fullname);
      formData.append('title',this.addArticleForm.get('contribution_title')?.value);
      formData.append('uploadImage', this.fileImg, this.fileImg.name);

      console.log(formData);
      console.log(this.addArticleForm.get('contribution_title')?.value);
      this.article.addNewArticle(formData).subscribe(res => {
        this.toast.success(res.message, 'Success', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });

        this.route.navigate(["/Management-Articles"]);
      },
      error => {
        this.toast.error(error.error.message, 'Error', {
          timeOut: 3000,
          progressBar: true,
          positionClass: 'toast-top-center'
        });
      });
    }
    else{
      Object.keys(this.addArticleForm.controls).forEach((field) => {
        const control = this.addArticleForm.get(field);
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

  handleFileInput(event: any){
    const file = event.target.files;
    if(file && file.length > 0){
      this.filetoUpload = event.target.files[0];
    }
  }

  // checkbox
  toggleButton() {
    // Toggle button's disabled state based on checkbox state
    this.isChecked = !this.isChecked
    this.isChecked ? this.enableButton() : this.disableButton() ;
  }

  disableButton() {
    // Disable the button
    const button = document.getElementById('btn-Confirm') as HTMLButtonElement;
    button.disabled = true;
  }

  enableButton() {
    // Enable the button
    const button = document.getElementById('btn-Confirm') as HTMLButtonElement;
    button.disabled = false;
  }
}
