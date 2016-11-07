import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { mainTemplate }   from './app.main.component';
import { SideButtonComponent }   from './app.side-buttons.component';
import { SideBarComponent }   from './app.side-nav-bar.component';
import { contentComponent }   from './app.content.component';
import { loginComponent }   from './app.login.component';
import { signupComponent } from './app.signup.component';
import {FormsModule, ReactiveFormsModule}         from "@angular/forms";
import { HttpModule }         from '@angular/http';
import { loginService }    from './services/app.login.service';
import { AuthGuard } from './guards/app.guard';

import { routing } from './app.routing';

@NgModule({
    imports:      	[ 	BrowserModule,
    					routing,
                        FormsModule,
                        HttpModule, 
                        ReactiveFormsModule
    				],
    declarations:   [   mainTemplate, 
                        SideButtonComponent,
                        SideBarComponent,
                        contentComponent,
                        loginComponent,
                        signupComponent
                    ],
    providers:      [   loginService,
                        AuthGuard
                    ],
    bootstrap:      [   mainTemplate
                    ]
})
export class mainModule {
}