import { Injectable }     	from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Observable }     	from 'rxjs/Observable';
import {Location, LocationStrategy} from '@angular/common';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class contentService {

  constructor (private http: Http, private location:Location, private locationStrategy:LocationStrategy){
  };
  
  getPlate(){
  	// var base = this.locationStrategy.getBaseHref();
  	// this.location.prepareExternalUrl(base + '9000');
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    return this.http.get('http://localhost:9000/ANPR/Car03.png', { headers }).map((res) =>
    	res.json()
    );
	};
}