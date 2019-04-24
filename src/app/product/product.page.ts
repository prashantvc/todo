import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  constructor(private broadcastService: BroadcastService,
    private authService: MsalService) { }

  ngOnInit() {
    this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
      console.log(payload);
    });

    this.broadcastService.subscribe("msal:acquireTokenFailure", payload => {
      console.log(payload);
    });
  }
}
