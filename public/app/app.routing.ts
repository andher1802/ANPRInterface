import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { loginComponent }      	from './app.login.component';
import { contentComponent }    	from './app.content.component';
import { signupComponent }		from './app.signup.component';
import { AuthGuard } 			from './guards/app.guard';


const appRoutes: Routes = [
	// { path: 'main', component: contentComponent, canActivate: [AuthGuard]},
	{ path: 'main', component: contentComponent},
	{ path: '', redirectTo: '/main',	pathMatch: 'full'},
	{ path: 'login', component: loginComponent }, 
	{ path: 'signup', component: signupComponent},
    { path: '**', redirectTo: '' }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);