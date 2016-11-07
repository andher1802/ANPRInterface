System.register(['@angular/core', '@angular/http', 'rxjs/add/operator/catch', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1, http_2;
    var loginService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            loginService = (function () {
                function loginService(http) {
                    this.http = http;
                }
                ;
                loginService.prototype.getDataServiceLogin = function (query) {
                    var _this = this;
                    var username = query['username'];
                    var password = query['password'];
                    var headers = new http_2.Headers();
                    headers.append('Content-Type', 'application/json');
                    var obs = this.http.post("/auth", JSON.stringify({ username: username, password: password }), { headers: headers }).map(function (res) { return res.json(); })
                        .map(function (res) {
                        if (res.status) {
                            _this.loggedIn = true;
                        }
                        return res;
                    });
                    return obs;
                };
                ;
                loginService.prototype.logout = function () {
                    this.loggedIn = false;
                };
                loginService.prototype.isLoggedIn = function () {
                    return this.loggedIn;
                };
                loginService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], loginService);
                return loginService;
            }());
            exports_1("loginService", loginService);
        }
    }
});
