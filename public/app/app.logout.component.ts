import { Component, OnInit } from '@angular/core';
import { loginService }	from './services/app.login.service';

@Component({
  selector: 'logout',
  templateUrl: 'app/templates/app.logout.template.html',
  styleUrls:['app/styles/app.login.style.css'],
})

export class logoutComponent{
  constructor(private loginService: loginService){
    this.loginService.logout();
  }
}