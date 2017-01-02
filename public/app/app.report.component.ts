import {Component, OnInit, OnDestroy} from '@angular/core';
import { contentService }	from './services/app.content.service';


@Component({
  selector: 'report',
  templateUrl: 'app/templates/app.report.template.html',
  styleUrls:['app/styles/app.report.style.css']
})

export class reportComponent implements OnInit, OnDestroy {
	currentReport:JSON;
	constructor(private contentService: contentService){
	}
  	ngOnInit() { 
  		this.currentReport = this.contentService.currentReport;
  		console.log(this.currentReport);
  	}
  	ngOnDestroy() {

  	}
}