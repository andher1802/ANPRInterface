System.register(['@angular/core', '@angular/router', '@angular/forms', './services/app.login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1, app_login_service_1;
    var loginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_login_service_1_1) {
                app_login_service_1 = app_login_service_1_1;
            }],
        execute: function() {
            loginComponent = (function () {
                function loginComponent(loginService, router, fb) {
                    this.loginService = loginService;
                    this.router = router;
                    this.username = new forms_1.FormControl("", forms_1.Validators.required);
                    this.password = new forms_1.FormControl("", forms_1.Validators.required);
                    this.loginForm = fb.group({
                        "username": this.username,
                        "password": this.password
                    });
                }
                loginComponent.prototype.login = function () {
                    var _this = this;
                    this.loginService.getDataServiceLogin(this.loginForm['_value']).subscribe(function (res) {
                        if (res['status']) {
                            _this.router.navigate(['/profile']);
                        }
                    });
                    this.loginForm.reset();
                };
                loginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/templates/app.login.template.html',
                        styleUrls: ['app/styles/app.login.style.css'],
                    }), 
                    __metadata('design:paramtypes', [app_login_service_1.loginService, router_1.Router, forms_1.FormBuilder])
                ], loginComponent);
                return loginComponent;
            }());
            exports_1("loginComponent", loginComponent);
        }
    }
});
