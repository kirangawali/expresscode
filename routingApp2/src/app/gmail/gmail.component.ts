import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignIn } from '../sign-in';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  
  signupModelForm = new SignIn('','','','','','','','');

  userType : any = ['Admin','Student','Trainer'];
  constructor() { }

  ngOnInit() {
  }

}
