import { Component, OnInit , OnDestroy} from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  userRole : string;
  private authListenerSubs: Subscription;

  constructor( private authService : AuthService) { }

  ngOnInit() { 
this.userIsAuthenticated = this.authService.getIsAuth();
this.userRole = this.authService.getUserRole();
    console.log(" header component init...  ");
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      console.log(" header component init...  "+isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
      this.userRole = this.authService.getUserRole();
    }); 
/*
    let authStatus = this.authService.getIsAuth();
    if(authStatus == true)
    {
      this.userIsAuthenticated = true;
      this.userRole = this.authService.getUserRole();
    }*/

    console.log(" header component end...  ")
}

onLogout() {
  this.authService.logout();
}

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
}

}
