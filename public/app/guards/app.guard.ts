import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { loginService }    from '../services/app.login.service';

@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router, private user: loginService) { } 
    canActivate() {
        if (this.user.isLoggedIn()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}