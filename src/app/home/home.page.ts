import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private router: Router, private broadcastService: BroadcastService, private authService: MsalService) { 
    if (this.authService.getUser()) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  isLoggedIn: boolean = false;

  login() {
    if (this.isLoggedIn) {
      this.authService.logout();
      return;
    }
    this.authService.loginRedirect();
  }

  getUserDetails(){
    var user = this.authService.getUser();
    console.log(user);
  }

  ngOnInit() {
    this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
      console.log(`login success ${payload}`);
    });

    this.broadcastService.subscribe("msal:acquireTokenFailure", payload => {
      console.log(`login failed ${payload}`);
    });
  }
}
