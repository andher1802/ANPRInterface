System.register(['@angular/core', '@angular/platform-browser', './app.main.component', './app.side-buttons.component', './app.side-nav-bar.component', './app.content.component', './app.login.component', './app.signup.component', "@angular/forms", '@angular/http', './services/app.login.service', './guards/app.guard', './app.routing'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, platform_browser_1, app_main_component_1, app_side_buttons_component_1, app_side_nav_bar_component_1, app_content_component_1, app_login_component_1, app_signup_component_1, forms_1, http_1, app_login_service_1, app_guard_1, app_routing_1;
    var mainModule;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (app_main_component_1_1) {
                app_main_component_1 = app_main_component_1_1;
            },
            function (app_side_buttons_component_1_1) {
                app_side_buttons_component_1 = app_side_buttons_component_1_1;
            },
            function (app_side_nav_bar_component_1_1) {
                app_side_nav_bar_component_1 = app_side_nav_bar_component_1_1;
            },
            function (app_content_component_1_1) {
                app_content_component_1 = app_content_component_1_1;
            },
            function (app_login_component_1_1) {
                app_login_component_1 = app_login_component_1_1;
            },
            function (app_signup_component_1_1) {
                app_signup_component_1 = app_signup_component_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_login_service_1_1) {
                app_login_service_1 = app_login_service_1_1;
            },
            function (app_guard_1_1) {
                app_guard_1 = app_guard_1_1;
            },
            function (app_routing_1_1) {
                app_routing_1 = app_routing_1_1;
            }],
        execute: function() {
            mainModule = (function () {
                function mainModule() {
                }
                mainModule = __decorate([
                    core_1.NgModule({
                        imports: [platform_browser_1.BrowserModule,
                            app_routing_1.routing,
                            forms_1.FormsModule,
                            http_1.HttpModule,
                            forms_1.ReactiveFormsModule
                        ],
                        declarations: [app_main_component_1.mainTemplate,
                            app_side_buttons_component_1.SideButtonComponent,
                            app_side_nav_bar_component_1.SideBarComponent,
                            app_content_component_1.contentComponent,
                            app_login_component_1.loginComponent,
                            app_signup_component_1.signupComponent
                        ],
                        providers: [app_login_service_1.loginService,
                            app_guard_1.AuthGuard
                        ],
                        bootstrap: [app_main_component_1.mainTemplate
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], mainModule);
                return mainModule;
            }());
            exports_1("mainModule", mainModule);
        }
    }
});
