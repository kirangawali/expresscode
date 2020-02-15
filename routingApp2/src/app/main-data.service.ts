import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlipkartData } from './flipkart-data';
import { Subject, Observable } from "rxjs";
import { Config } from './config';
import { SignIn } from './sign-in';
import { SignInData } from './sign-in-data';
import { LogIn } from './log-in';
 
@Injectable({
  providedIn: 'root'
})
export class MainDataService {

  private posts : FlipkartData[] = [];
  private msg : string;

  private postsUpdated = new Subject<FlipkartData[]>();

  constructor(private http: HttpClient) { }
  configUrl = 'assets/config.json';

  getConfig() {
   
    return this.http.get(this.configUrl);
  }

  a : Config[] = [];


  loginData( buser : LogIn )
  { 
  /*  console.log(' User = '+ user.userName); 
    console.log(' password = '+ user.password); 
    let body:any =  user; 
    let d = new Date(); 
    let hostUrl = 'http://localhost:3000/apps/user/signup'; 
    console.log(" hostUrl ::  "+hostUrl + " *** body *** "+body.userName  + " ** password ** "+ body.password );
 this.http.post(hostUrl,body); */

 console.log(' User = ' );

 console.log(' User = '+ buser.userName); 
 let body:any =  buser; 
 let d = new Date();
 let hostUrlNew = 'http://localhost:3000/apps/user/loginOne?v='+d.toLocaleTimeString();
 let t : any;
 console.log(" hostUrl ::  "+hostUrlNew + " *** body *** "+body.userName  + " ** password ** "+ body.password );
  return this.http.post(hostUrlNew, body);


  }

  addUserData( User : SignIn)
  {
    console.log(' User = ' );

    console.log(' User = '+ User.email); 
    let body:any =  User; 
    let d = new Date();
    let hostUrl = 'http://localhost:3000/apps/signup?v='+d.toLocaleTimeString();
    return this.http.post(hostUrl, body);
  
  }

  getHomePageData() 
  {
    console.log('-- Before HTTP call..');
    let d = new Date();
    //let url = 'http://127.0.0.1:8085?v='+d.toLocaleTimeString();    
    //let url = 'http://localhost:3000/api/users?v='+d.toLocaleTimeString();
    let url = 'http://localhost:3000/apps/getUsers?v='+d.toLocaleTimeString();
    console.log(' ---   = url : '+url);
   return  this.http.get(url);
  }
  


  getConfigPost() {
        console.log('-- Before HTTP call..');
        let d = new Date();
       // let url = 'http://127.0.0.1:8085?v='+d.toLocaleTimeString();
        let url = 'http://localhost:3000/bye?v='+d.toLocaleTimeString();
        console.log(' ---   = url 111111: '+url);
       return  this.http.get(url);
  }


 
  getConfigPostData() {
        console.log('-- Before HTTP call..');
        let d = new Date();
      //  let url = 'http://127.0.0.1:8085?v='+d.toLocaleTimeString();
        let url = 'http://localhost:3000?v='+d.toLocaleTimeString();
        console.log(' ---   = url  8888: '+url);
       return  this.http.get(url);
  }


  getPost() : any
  {

    console.log('-- Before HTTP call..');
let d = new Date();
//let url = 'http://127.0.0.1:8085?v='+d.toLocaleTimeString();
  let url = 'http://localhost:3000/hello?v='+d.toLocaleTimeString();
    console.log(' ---   = url 7777 : '+url);
    this.http.get<{msg : string}>(url).
    subscribe(response =>{
      this.msg = response.msg;
      console.log('1- After HTTP call..postData :: '+ response.msg);
        //   this.posts = postData.post;
     });

    console.log('2- After HTTP call..message = '+ this.msg);
 /*   console.log('After HTTP call..'+ this.posts.length);
    for(var i = 0 ; i < this.posts.length;i++)
    {
      console.log('*** '+ this.posts[i].name + "  **  "+ this.posts[i].pinCode);
    }
*/
    return this.posts;

  }
}
