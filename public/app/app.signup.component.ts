import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User }   from './models/app.user.model';

declare var io: any;

@Component({
  selector: 'signup',
  templateUrl: 'app/templates/app.signup.template.html',
  styleUrls:['app/styles/app.signup.style.css'],
})

export class signupComponent {
  socket: any;
  testForm: FormGroup;
  firstName = new FormControl("", Validators.required);
  lastName = new FormControl("", Validators.required);
  userName = new FormControl("", Validators.required);
  password = new FormControl("", Validators.required);

  constructor(private router: Router, fb: FormBuilder){ 
    this.socket = io();
    this.testForm = fb.group({
      "firstName":this.firstName,
      "lastName":this.lastName,
      "userName":this.userName,
      "password":this.password
    });
  }

  send(message) {
    this.socket.emit('signup-user',this.testForm['_value']);
    this.testForm.reset();
  }
}