import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

import { MainDataService } from './main-data.service';
 
import { LogIn } from './log-in';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SignInData } from './sign-in-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //this is a token variable
  private token : string;

  //this is for all details of loggedInuser 
  private loggedInUser : SignInData;

  //tokentimer used for auto expiration of Session
  private tokenTimer: any;

  //isAUthenticated - states weather user is authenticated or not
  private isAuthenticated = false;

  //userRole for admin, student, trainer
  private userRole : string;

  //status listener variable in case if session expire after duration it notifies other component like headercomponent
  private authStatusListener = new Subject<boolean>();
  


  getUserRole()
  {
      //console.log(" Inside getUserRole ... ");
      if(localStorage.getItem("token") != null)
      {
        //console.log(" Inside getUserRole ... token not null");
        this.userRole = localStorage.getItem("userRole") ;
      }
      //console.log(" Inside getUserRole ... token not null = "+this.userRole);
      return this.userRole;
  }

  getLoggedInUser()
  {

    if(localStorage.getItem("token") != null)
    {
    //console.log(" Inside getIsAuth ...token not null.. ");
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); 
    }
    //console.log(' current user : '+this.loggedInUser);
    return this.loggedInUser;
  }

    getIsAuth() {
    //console.log(" Inside getIsAuth ... ");
    //console.log(' this.token ... '+localStorage.getItem("token"));

    if(localStorage.getItem("token") != null)
    {
      //console.log(" Inside getIsAuth ...token not null.. ");
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
    }


  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();

  }

  getToken()
  {
    console.log(' this.token ... '+localStorage.getItem("token"));
    return localStorage.getItem("token");
  }

  constructor(private http: HttpClient, private routr : Router) {
  
     }



    /* This function is used for retrieving all registered users */
    getHomePageData() 
    {
      //console.log('--Auth Service Before HTTP call..');
      let d = new Date();
      /*const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.token
      }) */
      //let url = 'http://127.0.0.1:8085?v='+d.toLocaleTimeString();    
      //let url = 'http://localhost:3000/api/users?v='+d.toLocaleTimeString();
      let url = 'http://localhost:3000/apps/getUsers?v='+d.toLocaleTimeString();
      //console.log(' ---   = url : '+url);
      // return  this.http.get(url,{headers: new HttpHeaders().set('Authorization' ,'Bearer '+ this.token)});
     return  this.http.get(url);
    }

    /*This function is used for log in current user */
    loginData( user : LogIn )
    {  
      //console.log('AuthServiceAuthService User = '+ user.userName); 
      //console.log('AuthService password = '+ user.password); 
      let body:any =  user; 
      let d = new Date(); 
      let hostUrl = 'http://localhost:3000/apps/loginOne?v='+d.toLocaleTimeString();
      //console.log(" hostUrl ::  "+hostUrl);
  
      this.http.post<{token : string, user : SignInData, expiresIn: number}>(hostUrl, body).subscribe(response =>
      {
        /*This is a logic to set token , loggedIn User , userRole */
        console.log('Response.. '+response.token);
       // console.log('Response.. id'+user._id);
        const token = response.token;
        this.token = token;
        this.loggedInUser = response.user;
        this.userRole = this.loggedInUser.userType;
        //console.log('this.token.. '+this.token);
         
        /* This is a logic to set expiration time */
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        
        /* This is a logic to calculate when token is going to expire */
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        //console.log(expirationDate);

        /*This is a logic to save token , expiration date , user Role, logged In User inside local storage */
        this.saveAuthData(token, expirationDate, this.userRole, this.loggedInUser);

        /*This is a logic to indicate other authentication listener with real time date */
        this.authStatusListener.next(true);

        /*This is a logic to navigate to Home Page.. we can add any component */
        this.routr.navigate(['/myData']);
       

      });

  }

  /*This is a log out functionality */
  logout() {
            /* All saved values first we make null */
            this.token = null;
            this.loggedInUser = null;
            this.userRole =null;
            this.isAuthenticated = false;
            this.authStatusListener.next(false);

            /*This function clears all stored data inside local storage */
            localStorage.clear();

             /*This is a logic to navigate to Login Page.. we can add any component */
            this.routr.navigate(['/login']);
  }


  /* This function sets timeout and logout function is executed after duration..*/
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  /* This function saves data into local storage */
  private saveAuthData(token: string, expirationDate: Date, userRole: string, loggedInUser :SignInData) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("loggedInUser",  JSON.stringify(loggedInUser));   

  }


  /*This function clears all local storage data */
  private clearAuthData() {
    localStorage.clear();
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userRole");
  }


  /* This function gives us authentication data */
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }


  /*This function automatically gets executed and logs out user after duration */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  deleteData(user : SignInData)
  {

    let body:any =  user; 
    let d = new Date(); 
    let hostUrl = 'http://localhost:3000/apps/'+user._id;
    console.log("Delete--- hostUrl ::  "+hostUrl);

    this.http.delete(hostUrl, body).subscribe(response =>
    {

      console.log("Delete--- hostUrl :: 1  "+hostUrl);
      //localStorage.setItem("loggedInUser",  JSON.stringify(user));  
      //this.authStatusListener.next(true);

      /*This is a logic to navigate to Home Page.. we can add any component */
      this.routr.navigate(['/admin']);
    });

  }

  updateDetail(user : SignInData)
  {

    let body:any =  user; 
    let d = new Date(); 
    let hostUrl = 'http://localhost:3000/apps/'+user._id;
    //console.log(" hostUrl ::  "+hostUrl);

    this.http.put<{user : SignInData}>(hostUrl, body).subscribe(response =>
    {
      localStorage.setItem("loggedInUser",  JSON.stringify(user));  
      this.authStatusListener.next(true);

      /*This is a logic to navigate to Home Page.. we can add any component */
      this.routr.navigate(['/myData']);
    });

  }
}
