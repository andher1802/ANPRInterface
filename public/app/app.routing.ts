import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loginComponent }      	from './app.login.component';
import { logoutComponent }   from './app.logout.component';
import { contentComponent }    	from './app.content.component';
import { signupComponent }		from './app.signup.component';
import { profileComponent }		from './app.profile.component';

import { AuthGuard } 			from './guards/app.guard';

const appRoutes: Routes = [
	{ path: 'main', component: contentComponent, canActivate: [AuthGuard]},
	{ path: 'profile', component: profileComponent, canActivate: [AuthGuard] }, 
	{ path: 'login', component: loginComponent }, 
	{ path: 'logout', component: logoutComponent }, 
	{ path: 'signup', component: signupComponent },

	{ path: '', redirectTo: '/login',	pathMatch: 'full'},
    { path: '**', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);