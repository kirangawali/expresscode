import { Component, OnInit } from '@angular/core';
import { SignIn } from '../sign-in';
import { MainDataService } from '../main-data.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupModelForm = new SignIn('','','','','','','','');

  userType : any = ['Admin','Student','Trainer'];


  constructor( private mainService : MainDataService, private http : HttpClient,private routes: RouterModule,
    private routr : Router,
    private route: ActivatedRoute)
  {

  }
  returnUrl : String = '';
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  addUser()
  {
    console.log('---'+ this.signupModelForm.userName);
    this.mainService.addUserData(this.signupModelForm);
    this.mainService.addUserData(this.signupModelForm).subscribe( (response) => {
      console.log(' User  Added:: '+ response);
      this.routr.navigate(['/login']);
    });

   //

  }

}
