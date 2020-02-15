import { Component, OnInit } from '@angular/core';
import { LogIn } from '../log-in';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { MainDataService } from '../main-data.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl : String = '';
  loginModelForm = new LogIn('','');
  isLoading : boolean = false;

  constructor(private routr : Router,
    private route: ActivatedRoute, private mainService : MainDataService, 
    private authService : AuthService) { }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

login()
{
  this.isLoading = true;
  console.log('before login..');
  console.log(" userName :: "+this.loginModelForm.userName );
  console.log(" password :: "+ this.loginModelForm.password );
  /*this.mainService.loginData(this.loginModelForm).subscribe( (response) => {
    console.log(' User  Added:: '+ response.toLocaleString());
  });*/
  this.authService.loginData(this.loginModelForm);
  //
  console.log('after a login..');
}

}
