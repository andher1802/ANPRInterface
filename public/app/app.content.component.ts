import { contentService }	from './services/app.content.service';
import { Router } from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
declare var io: any;

import {ImageZoomModule} from 'angular2-image-zoom';

@Component({
  selector: 'content',
  templateUrl: 'app/templates/app.content.template.html',
  styleUrls:['app/styles/app.content.style.css']
})

export class contentComponent implements OnInit, OnDestroy {
	message:string;
  location:string;
  currentImage:string;
  currentResults:Array<string[]>=[];
  private plateByUser:string;
  socket: any;
  absoluteIndex:number = 0;
  currentReport:JSON;

  constructor(private contentService: contentService, private router: Router){
    this.socket = io();
  }

  ReadFolder($event):void{
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    var file:Array<File> = inputValue.files; 
    var myReader:FileReader = new FileReader();
    var counterProgress:number=0;

    for(let fileName of file) {
      var condition:boolean = false;
      let checkFileExtension:string = fileName.name.substring(fileName.name.length-3);
      
      if(checkFileExtension=='png'){
        condition = true;
      }      

      if(condition){
        let tempResult:Array<string>=[];
        let resultPlate:string;
        tempResult.push(fileName.name);
        this.contentService.getPlateByName(fileName.name).then(
          (res)=>{
            if(res.status){
              resultPlate = res.result[0] + res.result[1] + res.result[2] + '-' + res.result[3] + res.result[4] + res.result[5];
              tempResult.push(resultPlate);
            }
            this.currentResults.push(tempResult);                    
        }).then((res)=>{
            this.currentImage = this.currentResults[this.currentResults.length-1][0];
            this.message = this.currentResults[this.currentResults.length-1][1];
            counterProgress = counterProgress + 1;
        });
      }
      else{
        console.log("image exists");
      }
    }
  }

  sendImage(plateByUser:string, plateLocation:string) {
    if (this.currentResults.length > 0){
        this.currentResults[this.absoluteIndex][1] = plateByUser;
        let imageData:any = {
          "imageid":this.currentResults[this.absoluteIndex][0],
          "posicionx":plateLocation,
          "posiciony":plateLocation,
          "plate":plateByUser
        }
        var imageDataOutput:JSON = <JSON>imageData;
      }
      this.socket.emit('signup-user',imageDataOutput);
    }

  prevImage(){
    if(this.absoluteIndex!=0){
      this.absoluteIndex = this.absoluteIndex-1;
      this.currentImage = this.currentResults[this.absoluteIndex][0];
      this.message = this.currentResults[this.absoluteIndex][1];
    }
  }

  nextImage(){
    let upBound:number = this.currentResults.length - 1; 
    if(this.absoluteIndex!=upBound){
      this.absoluteIndex = this.absoluteIndex+1;
      this.currentImage = this.currentResults[this.absoluteIndex][0];
      this.message = this.currentResults[this.absoluteIndex][1];      
    }
  }

  removeImage(){
    if(this.absoluteIndex>0){
      this.currentImage = this.currentResults[this.absoluteIndex-1][0];
      this.message = this.currentResults[this.absoluteIndex-1][1];
      this.currentResults.splice(this.absoluteIndex, 1);   
    }
    else {
      this.currentImage = this.currentResults[this.absoluteIndex+1][0];
      this.message = this.currentResults[this.absoluteIndex+1][1]; 
      this.currentResults.splice(this.absoluteIndex, 1);

    }
  }

  sendCarData(plateByUser:string, plateLocation:string){
      if (this.currentResults.length > 0){
        this.currentResults[this.absoluteIndex][1] = plateByUser;
        let imageData:any = {
          "imageid":this.currentResults[this.absoluteIndex][0],
          "posicionx":plateLocation,
          "posiciony":plateLocation,
          "plate":plateByUser
        }
        this.currentReport = <JSON>imageData;
    }
    this.router.navigate(['/report']);
  }

  //Get Image zoom
  clickImageStatePos:boolean = false;
  private clickImageState(event:MouseEvent){
      this.clickImageStatePos = true;
  }

  private coordinates(event: MouseEvent):void {
      let boundLeftUp:Array<number> = [event.clientX - 35, event.clientY - 15 ]; 
      let boundLeftDown:Array<number> = [event.clientX - 35, event.clientY + 15 ]; 
      let boundRightUp:Array<number> = [event.clientX + 35, event.clientY - 15 ]; 
      let boundRightDown:Array<number> = [event.clientX + 35, event.clientY + 15 ];
      if(this.clickImageStatePos){
        this.location = event.clientX + '-' + event.clientY;
        this.clickImageStatePos = false
      }
      
  }

  ngOnInit() { 
  }

  ngOnDestroy() {
    this.contentService.currentReport = this.currentReport;
  }
}