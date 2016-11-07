import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-bar',
  templateUrl: 'app/templates/app.side-nav-bar.template.html',
  styleUrls:['app/styles/app.side-nav-bar.style.css'],
})

export class SideBarComponent { 
	@Input('currentState') currentState:string;
}