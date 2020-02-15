import { Component, OnInit } from '@angular/core';
import { SignInData } from '../sign-in-data';
import { MainDataService } from '../main-data.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private mainService : MainDataService, private http : HttpClient,private routes: RouterModule,private routr : Router,
    private route: ActivatedRoute, private authService : AuthService)
  {

  }

  uDataList : SignInData[] = [];
  returnUrl : String = '';
loggedInUser : SignInData;

  ngOnInit() {
 
      let data2: any = [];
    
      console.log('**** *** Init*****');

      this.authService.getHomePageData()
      .subscribe((p :SignInData[] ) =>  {

      console.log('Data received 3:: '+p.length);
      console.log('Data received 3:: '+p.toString().length);
      this.uDataList =p;
    
 

  });
 this.loggedInUser = this.authService.getLoggedInUser();

 

  }

  deleteUser (user : SignInData )
  {
    this.authService.deleteData(user);
    //console.log("DELETE... "+ user._id)

  }



}
