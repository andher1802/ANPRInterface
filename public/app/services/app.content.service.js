System.register(['@angular/core', '@angular/http', '@angular/common', 'rxjs/add/operator/toPromise', 'rxjs/add/operator/catch', 'rxjs/add/operator/map'], function(exports_1, context_1) {
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
    var core_1, http_1, common_1, http_2;
    var contentService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
                http_2 = http_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            contentService = (function () {
                function contentService(http, location, locationStrategy) {
                    this.http = http;
                    this.location = location;
                    this.locationStrategy = locationStrategy;
                }
                ;
                contentService.prototype.getPlate = function () {
                    // var base = this.locationStrategy.getBaseHref();
                    // this.location.prepareExternalUrl(base + '9000');
                    var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
                    return this.http.get('http://localhost:9000/ANPR/Car03.png', { headers: headers }).map(function (res) {
                        return res.json();
                    });
                };
                ;
                contentService.prototype.getPlateByName = function (fileName) {
                    var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
                    return this.http.get('http://localhost:9000/ANPR/' + fileName, { headers: headers }).map(function (res) {
                        return res.json();
                    }).toPromise();
                };
                ;
                contentService.prototype.getRunt = function () {
                    var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
                    return this.http.get('http://runt-service', { headers: headers }).map(function (res) { return res.json(); });
                };
                contentService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, common_1.Location, common_1.LocationStrategy])
                ], contentService);
                return contentService;
            }());
            exports_1("contentService", contentService);
        }
    }
});
