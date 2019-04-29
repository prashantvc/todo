import { HttpServiceHelper } from './../common/HttpServiceHelper';
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
  constructor(private router: Router, private broadcastService: BroadcastService, private authService: MsalService, private httpService: HttpServiceHelper) {
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
    this.getImage();
  }

  createImage(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageData = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImage() {
    this.isImageLoading = true;
    this.httpService.getPicture("https://graph.microsoft.com/v1.0/me/photo/$value")
      .subscribe(data => {
        this.createImage(data);
        this.isImageLoading = false;
      },
        err => {
          this.isImageLoading = false;
          console.error(err);
        });
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

  imageData: any = "https://i.imgur.com/m6EYMsF.png";
  isImageLoading: boolean;
  isLoggedIn: boolean = false;
  userData = { name: "User name", email: "email@microsoft.com" };
  private subscription: Subscription;
}
