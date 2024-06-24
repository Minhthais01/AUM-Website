import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-articles',
  templateUrl: './update-articles.component.html',
  styleUrls: ['./update-articles.component.css']
})
export class UpdateArticlesComponent {
  updateArticleForm!: FormGroup
  isChecked: boolean = true;
  articleID : number = 0;
  public lstArticles : any = [];
  currentDate: Date = new Date();

  pathImg : string = "";
  pathDoc : string = "";

  imgUri !: File;
  filetoUpload !: File;
  contribution_id: any;
  fullname: any;
  imageUrl: string | ArrayBuffer = '';

  constructor(
    private fb: FormBuilder,
    private auth: UserService,
    private route:Router,
    private activatedRouter : ActivatedRoute,
    private article : ArticleService,
    private toast:ToastrService,
    private userStore:UserStoreService
    ){
  }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.articleID = +params['id'];
      this.getArticle(this.articleID);
    });

    this.userStore.getFullNameFromStore().subscribe(res => {
      let fullNameFromToken = this.auth.getFullNameFormToken();
      this.fullname = res || fullNameFromToken;
    });

    this.updateArticleForm = this.fb.group({
      contribution_title:['', Validators.required],
      contribution_submition_date:['', Validators.required]
    });
  }

  getArticle(contribution_id:number){
    this.article.getArticleById(contribution_id).subscribe(data => {
      this.lstArticles = data;
      this.pathImg = this.article.Img;
      this.pathDoc = this.article.doc;

      for(const c of this.lstArticles){
        this.updateArticleForm.patchValue({
          contribution_title : c.contribution_title,
          contribution_submition_date : c.contribution_submition_date,
        });

        this.contribution_id = c.contribution_id;
      }
    });
  }

  // uploadImage(event:any){
  //   const file = event.target.files;
  //   if(file && file.length > 0){
  //     this.imgUri = event.target.files[0];
  //   }
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.imgUri = event.target.files[0];
      };
      reader.readAsDataURL(file);
    }
  }

  handleFileInput(event:any){
    const file = event.target.files;
    if(file && file.length > 0){
      this.filetoUpload = event.target.files[0];
    }
  }

  UpdateArticles(){
    if(this.updateArticleForm.valid){
      if(this.filetoUpload == undefined && this.imgUri == undefined){
        const formData:FormData = new FormData();
        formData.append('submitDate',this.currentDate.toDateString());
        formData.append('title',this.updateArticleForm.get('contribution_title')?.value);
        formData.append('contribution_id', this.contribution_id);
        formData.append('username',this.fullname);

        this.article.UpdateArticles(formData).subscribe(res =>{
          this.toast.success(res.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });

          this.route.navigate(['/Management-Articles']);
        },
        error => {
          this.toast.error(error.error.message, 'Error', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
        });
      }
      else if(this.filetoUpload != null && this.imgUri == null){
        const formData:FormData = new FormData();
        formData.append('uploadFile', this.filetoUpload, this.filetoUpload.name);
        formData.append('submitDate',this.currentDate.toDateString());
        formData.append('title',this.updateArticleForm.get('contribution_title')?.value);
        formData.append('contribution_id', this.contribution_id);
        formData.append('username',this.fullname);

        this.article.UpdateArticles(formData).subscribe(res =>{
          this.toast.success(res.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });

          this.route.navigate(['/Management-Articles']);
        },
        error => {
          this.toast.error(error.error.message, 'Error', {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
        });
      }
      else if(this.filetoUpload == null && this.imgUri != null){
        const formData:FormData = new FormData();
        formData.append('submitDate',this.currentDate.toDateString());
        formData.append('title',this.updateArticleForm.get('contribution_title')?.value);
        formData.append('uploadImage', this.imgUri, this.imgUri.name);
        formData.append('contribution_id', this.contribution_id);
        formData.append('username',this.fullname);

        this.article.UpdateArticles(formData).subscribe(res =>{
          this.toast.success(res.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
          // location.reload();
          this.route.navigate(['/Management-Articles']);
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
        const formData:FormData = new FormData();
        formData.append('uploadFile', this.filetoUpload, this.filetoUpload.name);
        formData.append('submitDate',this.currentDate.toDateString());
        formData.append('title',this.updateArticleForm.get('contribution_title')?.value);
        formData.append('uploadImage', this.imgUri, this.imgUri.name);
        formData.append('contribution_id', this.contribution_id);
        formData.append('username',this.fullname);

        this.article.UpdateArticles(formData).subscribe(res =>{
          this.toast.success(res.message, "Success", {
            timeOut: 3000,
            progressBar: true,
            positionClass: 'toast-top-center'
          });
          // location.reload();
          this.route.navigate(['/Management-Articles']);
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
    else{
      Object.keys(this.updateArticleForm.controls).forEach((field) => {
        const control = this.updateArticleForm.get(field);
        if (control instanceof FormControl) {
          control.markAsDirty({ onlySelf: true });
        }
      });
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
