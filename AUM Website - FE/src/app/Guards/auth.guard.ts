import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserStoreService } from '../services/user-store.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{
  adminRole:string = '';
  lstAccount:any=[];

  constructor(
    private auth:UserService,
    private router:Router,
    private toast:ToastrService,
    private userStore: UserStoreService
  ){}

  canActivate():boolean{
    this.userStore.getRoleFromStore().subscribe(data =>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.adminRole = data || roleFromToken;
    })

    this.auth.getAllAccount().subscribe(data => {
      this.lstAccount = data;
    })

    if(this.auth.isLoggedIn() && this.adminRole == "Admin"){
      return true;
    }
    else{
      this.toast.warning("Please login first", 'Warning!', {
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-top-center',
      })
      this.router.navigate(['login']);
      return false;
    }
  }

}
