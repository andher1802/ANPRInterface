import { Injectable }     	from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Observable }     	from 'rxjs/Observable';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class loginService {
  messages:Array<String>;
  socket: any;
  loggedIn;

  constructor (private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  };
  
  getDataServiceLogin(query:Object): Observable<Object[]> {
  let username = query['username'];
  let password = query['password'];
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  let obs = this.http.post("/auth", JSON.stringify({username, password}), { headers }).map(res => res.json())
  .map((res) => {
        if (res.status) {
          localStorage.setItem('auth_token', username);
          this.loggedIn = true;
        }
        return res;
      });
  return obs;
  };

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}