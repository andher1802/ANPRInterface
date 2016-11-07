import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-button',
  templateUrl: 'app/templates/app.side-buttons.template.html',
  styleUrls:['app/styles/app.side-buttons.style.css'],
})

export class SideButtonComponent{ 
	public currentState:String = 'showState';
	@Output('myState') myState = new EventEmitter();
	sendState(evt){
		if(this.currentState=='showState'){
			this.currentState='hiddenState';
		}
		else{
			this.currentState='showState';
		}
		this.myState.next([this.currentState]);
	}
}