// profile.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ProfileService {
  constructor(private http: Http) {
  }

  getProfile() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('username', `${authToken}`);
    return this.http.get('/userinfo', { headers }).map((res) => res.json());
  }
}