import { Component, OnInit } from '@angular/core';
import { SignInData } from '../sign-in-data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.css']
})
export class MyDataComponent implements OnInit {

  constructor(private authService : AuthService) { }


  user : SignInData;

  ngOnInit() {

    this.user = this.authService.getLoggedInUser();
    console.log(" **** this.id *** "+ this.user._id);
    
  }

  updateDetail( userData : SignInData)
  {
    console.log('***** userData._id  **** = '+userData._id);
    this.authService.updateDetail(userData);
  }

}
