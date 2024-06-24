import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit{
  public lstAccount : any =[];
  pageSize = 5;
  currentPage = 1;

  constructor(
    private auth:UserService
  ){}

  ngOnInit(): void {
    this.getAllAccount();
  }

  getAllAccount(){
    this.auth.getAllAccount().subscribe(data => {
      this.lstAccount = data;
      console.table(this.lstAccount);
    });
  }
}
