import { Component } from '@angular/core';
import { contentService }	from './services/app.content.service';


@Component({
  selector: 'content',
  templateUrl: 'app/templates/app.content.template.html',
  styleUrls:['app/styles/app.content.style.css']
})


export class contentComponent{
	idImage:string;
	result:Array<string>;
	char1:string;
	char2:string;
	char3:string;
	num1:string;
	num2:string;
	num3:string;
	message:string;

  constructor(private contentService: contentService){

  }

  GetPlate(event):void {
  	this.contentService.getPlate().subscribe((res)=>{
  		if(res.status){
  			this.idImage = res.ID;
  			this.result = res.result;
  			this.char1 = this.result[0];
  			this.char2 = this.result[1];
  			this.char3 = this.result[2];
  			this.num1 = this.result[3];
  			this.num2 = this.result[4];
  			this.num3 = this.result[5];
  			this.message = this.char1+this.char2+this.char3+'-'+this.num1+this.num2+this.num3;
  		}
  	});
  }
}