import { Component,OnInit } from '@angular/core'; 
import { MainDataService } from './main-data.service';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [MainDataService]
})
export class AppComponent implements OnInit {
  title = 'routingApp2';
  
  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  startDate = new Date(1990, 0, 1);

  constructor( private mainService : MainDataService, private http : HttpClient,private routes: RouterModule, 
    private authService : AuthService)
  {

  }

  ngOnInit()
  {
    console.log('Before call from app component..');
    let data1 : Config[]=[];
/*
    this.mainService.getConfigPostData().subscribe( (response) => {
      console.log(' Data received:: '+ response);
    });*/


    //data = this.mainService.getPost();
    this.mainService.getConfigPost()
    .subscribe((response : Config[]) =>  {

    //console.log(' data 1 = '+response.toString());
    //console.log(' data 2 = '+response);
data1 = response;
//console.log(' data 2 = '+data1.length);
for(var i = 0 ; i < data1.length; i++)
{
  //console.log(i + " .. "+ data1[i].textfile + " .. "+ data1[i].heroesUrl);
}

  });

    console.log('After call from app component..'+data1);

  }

}
