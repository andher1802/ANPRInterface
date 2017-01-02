System.register(['@angular/core', './services/app.content.service'], function(exports_1, context_1) {
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
    var core_1, app_content_service_1;
    var reportComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            }],
        execute: function() {
            reportComponent = (function () {
                function reportComponent(contentService) {
                    this.contentService = contentService;
                }
                reportComponent.prototype.ngOnInit = function () {
                    this.currentReport = this.contentService.currentReport;
                    console.log(this.currentReport);
                };
                reportComponent.prototype.ngOnDestroy = function () {
                };
                reportComponent = __decorate([
                    core_1.Component({
                        selector: 'report',
                        templateUrl: 'app/templates/app.report.template.html',
                        styleUrls: ['app/styles/app.report.style.css']
                    }), 
                    __metadata('design:paramtypes', [app_content_service_1.contentService])
                ], reportComponent);
                return reportComponent;
            }());
            exports_1("reportComponent", reportComponent);
        }
    }
});
