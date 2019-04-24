import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string;
  password: string;

  constructor(private router:Router){
    
  }

  login() {
    console.log(`username: ${this.username}, password: ${this.password}`);
    this.router.navigate(['product']);
  }

  goRegister() {

  }
}
