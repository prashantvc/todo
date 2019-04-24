import { BroadcastService, MsalService } from '@azure/msal-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  login() {
    if (this.isLoggedIn) {
      this.authService.logout();
      return;
    }
    this.authService.loginRedirect();
  }

  getUserDetails() {
    var user = this.authService.getUser();
    this.userData = { name: user.name, email: user.displayableId };
    console.log(`${user.displayableId}, ${user.name}`);
  }

  ngOnInit() {
    this.subscription = this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
      console.log(`login success ${payload}`);
    });

    this.broadcastService.subscribe("msal:acquireTokenFailure", payload => {
      console.log(`login failed ${payload}`);
    });
  }

  ngOnDestroy() {
    this.broadcastService.getMSALSubject().next(1);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isLoggedIn: boolean = false;
  userData = {name:"User name", email:"email@microsoft.com"};
  private subscription: Subscription;
}
