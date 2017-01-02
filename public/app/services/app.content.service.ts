import { Injectable }     	from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Observable }     	from 'rxjs/Observable';
import {Location, LocationStrategy} from '@angular/common';
import 'rxjs/add/operator/toPromise';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class contentService {
  public currentReport:JSON;

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

  getPlateByName(fileName:string){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    return this.http.get('http://localhost:9000/ANPR/'+fileName, { headers }).map((res) =>
      res.json()
    ).toPromise();
  };

  getRunt(){
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    return this.http.get('http://runt-service', { headers }).map((res) => res.json());
  }

}