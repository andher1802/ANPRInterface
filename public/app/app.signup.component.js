System.register(['@angular/core', '@angular/router', '@angular/forms'], function(exports_1, context_1) {
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
    var core_1, router_1, forms_1;
    var signupComponent;
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
            }],
        execute: function() {
            signupComponent = (function () {
                function signupComponent(router, fb) {
                    this.router = router;
                    this.firstName = new forms_1.FormControl("", forms_1.Validators.required);
                    this.lastName = new forms_1.FormControl("", forms_1.Validators.required);
                    this.userName = new forms_1.FormControl("", forms_1.Validators.required);
                    this.password = new forms_1.FormControl("", forms_1.Validators.required);
                    this.socket = io();
                    this.testForm = fb.group({
                        "firstName": this.firstName,
                        "lastName": this.lastName,
                        "userName": this.userName,
                        "password": this.password
                    });
                }
                signupComponent.prototype.send = function (message) {
                    this.socket.emit('signup-user', this.testForm['_value']);
                    this.testForm.reset();
                };
                signupComponent = __decorate([
                    core_1.Component({
                        selector: 'signup',
                        templateUrl: 'app/templates/app.signup.template.html',
                        styleUrls: ['app/styles/app.signup.style.css'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder])
                ], signupComponent);
                return signupComponent;
            }());
            exports_1("signupComponent", signupComponent);
        }
    }
});
