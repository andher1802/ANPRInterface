import { Injectable }     	from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Observable }     	from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';


@Injectable()
export class imageService {
	imagesList:Array<string>;
	constructor (private http: Http) {
	};

	getDataImages(query:Object): Observable<Object[]> {
	let imageid = query['imageid'];
	let headers = new Headers();
	headers.append('Content-Type', 'application/json');

	let obs = this.http.post("/imagesInfo", JSON.stringify({imageid}), { headers }).map(res => res.json())
	.map((res) => {
	    if (res.status) {
	    	console.log("imageExists");
	    }
	    return res;
	  });
	return obs;
	};
}