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
    var contentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            }],
        execute: function() {
            contentComponent = (function () {
                function contentComponent(contentService) {
                    this.contentService = contentService;
                }
                contentComponent.prototype.GetPlate = function (event) {
                    var _this = this;
                    this.contentService.getPlate().subscribe(function (res) {
                        if (res.status) {
                            _this.idImage = res.ID;
                            _this.result = res.result;
                            _this.char1 = _this.result[0];
                            _this.char2 = _this.result[1];
                            _this.char3 = _this.result[2];
                            _this.num1 = _this.result[3];
                            _this.num2 = _this.result[4];
                            _this.num3 = _this.result[5];
                            _this.message = _this.char1 + _this.char2 + _this.char3 + '-' + _this.num1 + _this.num2 + _this.num3;
                        }
                    });
                };
                contentComponent = __decorate([
                    core_1.Component({
                        selector: 'content',
                        templateUrl: 'app/templates/app.content.template.html',
                        styleUrls: ['app/styles/app.content.style.css']
                    }), 
                    __metadata('design:paramtypes', [app_content_service_1.contentService])
                ], contentComponent);
                return contentComponent;
            }());
            exports_1("contentComponent", contentComponent);
        }
    }
});
