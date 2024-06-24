import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/services/share.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public role: string = "";
  public fullName: string ="";
  
  constructor(private userStore:UserStoreService, private auth:UserService, private shareService : ShareService, private router: Router,){}

ngOnInit(): void {
  this.userStore.getFullNameFromStore().subscribe(res => {
    let fullNameFromToken = this.auth.getFullNameFormToken();
    this.fullName = res || fullNameFromToken;
  });

  this.userStore.getRoleFromStore().subscribe(res => {
    let roleFromToken = this.auth.getRoleFromToken();
    this.role = res || roleFromToken;
})}



onStart(){

  if(this.role === "Admin"){
    this.router.navigate(['/Admin-Statistic']);
  }
  else if(this.role === "Coordinator"){
    this.router.navigate(['/View-Comment']);
    
  }
  else if(this.role === "Student"){
    this.router.navigate(['/View-Student']);
  }
  else if(this.role === "Manager"){
    this.router.navigate(['/View-ManagerHome']);
  }
  else{
    this.router.navigate(['/View-Articles']);
  }
}

}




