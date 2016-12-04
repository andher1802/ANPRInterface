import { Component, Input} from '@angular/core';
import { ProfileService } from './services/app.profile.service';

@Component({
  selector: 'profile',
  templateUrl: 'app/templates/app.profile.template.html',
  styleUrls:['app/styles/app.login.style.css']
})

export class profileComponent{
	userName:string;
	firstName:string;
	lastName:string;
	constructor(private profileService: ProfileService){
		this.profileService.getProfile().subscribe((res)=>{
			this.firstName = res.firstName;
			this.lastName = res.lastName;
			this.userName = res.userName;
	  	});
	}
}