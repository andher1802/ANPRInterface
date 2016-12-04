System.register(['@angular/core', './services/app.profile.service'], function(exports_1, context_1) {
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
    var core_1, app_profile_service_1;
    var profileComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_profile_service_1_1) {
                app_profile_service_1 = app_profile_service_1_1;
            }],
        execute: function() {
            profileComponent = (function () {
                function profileComponent(profileService) {
                    var _this = this;
                    this.profileService = profileService;
                    this.profileService.getProfile().subscribe(function (res) {
                        _this.firstName = res.firstName;
                        _this.lastName = res.lastName;
                        _this.userName = res.userName;
                    });
                }
                profileComponent = __decorate([
                    core_1.Component({
                        selector: 'profile',
                        templateUrl: 'app/templates/app.profile.template.html',
                        styleUrls: ['app/styles/app.login.style.css']
                    }), 
                    __metadata('design:paramtypes', [app_profile_service_1.ProfileService])
                ], profileComponent);
                return profileComponent;
            }());
            exports_1("profileComponent", profileComponent);
        }
    }
});
