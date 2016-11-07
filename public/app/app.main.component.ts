import { Component } from '@angular/core';

@Component({
  selector: 'main-template',
  templateUrl: 'app/templates/app.main.template.html',
  styleUrls:['app/styles/app.main.style.css'],
})

export class mainTemplate {
	public setDisplay:string='none';
	constructor(){
	}
	getStateButton(arg:string){
		this.setDisplay=arg;
		console.log(arg);
	}
}