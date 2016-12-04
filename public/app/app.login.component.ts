import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { loginService }	from './services/app.login.service';

@Component({
  selector: 'login',
  templateUrl: 'app/templates/app.login.template.html',
  styleUrls:['app/styles/app.login.style.css'],
})

export class loginComponent{
  loginForm:FormGroup;
  username = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);
  currentUser:String;

  constructor(private loginService: loginService, private router: Router, fb: FormBuilder){
      this.loginForm = fb.group({
          "username": this.username,
          "password": this.password
      });
  }

  login():void {    
    this.loginService.getDataServiceLogin(this.loginForm['_value']).subscribe((res)=>{
    if(res['status']){
      this.router.navigate(['/profile']);
    }
  });
    this.loginForm.reset();
  }

}