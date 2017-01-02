System.register(['./services/app.content.service', '@angular/router', '@angular/core'], function(exports_1, context_1) {
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
    var app_content_service_1, router_1, core_1;
    var contentComponent;
    return {
        setters:[
            function (app_content_service_1_1) {
                app_content_service_1 = app_content_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            contentComponent = (function () {
                function contentComponent(contentService, router) {
                    this.contentService = contentService;
                    this.router = router;
                    this.currentResults = [];
                    this.absoluteIndex = 0;
                    //Get Image zoom
                    this.clickImageStatePos = false;
                    this.socket = io();
                }
                contentComponent.prototype.ReadFolder = function ($event) {
                    this.readThis($event.target);
                };
                contentComponent.prototype.readThis = function (inputValue) {
                    var _this = this;
                    var file = inputValue.files;
                    var myReader = new FileReader();
                    var counterProgress = 0;
                    var _loop_1 = function(fileName) {
                        condition = false;
                        var checkFileExtension = fileName.name.substring(fileName.name.length - 3);
                        if (checkFileExtension == 'png') {
                            condition = true;
                        }
                        if (condition) {
                            var tempResult_1 = [];
                            var resultPlate_1;
                            tempResult_1.push(fileName.name);
                            this_1.contentService.getPlateByName(fileName.name).then(function (res) {
                                if (res.status) {
                                    resultPlate_1 = res.result[0] + res.result[1] + res.result[2] + '-' + res.result[3] + res.result[4] + res.result[5];
                                    tempResult_1.push(resultPlate_1);
                                }
                                _this.currentResults.push(tempResult_1);
                            }).then(function (res) {
                                _this.currentImage = _this.currentResults[_this.currentResults.length - 1][0];
                                _this.message = _this.currentResults[_this.currentResults.length - 1][1];
                                counterProgress = counterProgress + 1;
                            });
                        }
                        else {
                            console.log("image exists");
                        }
                    };
                    var this_1 = this;
                    var condition;
                    for (var _i = 0, file_1 = file; _i < file_1.length; _i++) {
                        var fileName = file_1[_i];
                        _loop_1(fileName);
                    }
                };
                contentComponent.prototype.sendImage = function (plateByUser, plateLocation) {
                    if (this.currentResults.length > 0) {
                        this.currentResults[this.absoluteIndex][1] = plateByUser;
                        var imageData = {
                            "imageid": this.currentResults[this.absoluteIndex][0],
                            "posicionx": plateLocation,
                            "posiciony": plateLocation,
                            "plate": plateByUser
                        };
                        var imageDataOutput = imageData;
                    }
                    this.socket.emit('signup-user', imageDataOutput);
                };
                contentComponent.prototype.prevImage = function () {
                    if (this.absoluteIndex != 0) {
                        this.absoluteIndex = this.absoluteIndex - 1;
                        this.currentImage = this.currentResults[this.absoluteIndex][0];
                        this.message = this.currentResults[this.absoluteIndex][1];
                    }
                };
                contentComponent.prototype.nextImage = function () {
                    var upBound = this.currentResults.length - 1;
                    if (this.absoluteIndex != upBound) {
                        this.absoluteIndex = this.absoluteIndex + 1;
                        this.currentImage = this.currentResults[this.absoluteIndex][0];
                        this.message = this.currentResults[this.absoluteIndex][1];
                    }
                };
                contentComponent.prototype.removeImage = function () {
                    if (this.absoluteIndex > 0) {
                        this.currentImage = this.currentResults[this.absoluteIndex - 1][0];
                        this.message = this.currentResults[this.absoluteIndex - 1][1];
                        this.currentResults.splice(this.absoluteIndex, 1);
                    }
                    else {
                        this.currentImage = this.currentResults[this.absoluteIndex + 1][0];
                        this.message = this.currentResults[this.absoluteIndex + 1][1];
                        this.currentResults.splice(this.absoluteIndex, 1);
                    }
                };
                contentComponent.prototype.sendCarData = function (plateByUser, plateLocation) {
                    if (this.currentResults.length > 0) {
                        this.currentResults[this.absoluteIndex][1] = plateByUser;
                        var imageData = {
                            "imageid": this.currentResults[this.absoluteIndex][0],
                            "posicionx": plateLocation,
                            "posiciony": plateLocation,
                            "plate": plateByUser
                        };
                        this.currentReport = imageData;
                    }
                    this.router.navigate(['/report']);
                };
                contentComponent.prototype.clickImageState = function (event) {
                    this.clickImageStatePos = true;
                };
                contentComponent.prototype.coordinates = function (event) {
                    var boundLeftUp = [event.clientX - 35, event.clientY - 15];
                    var boundLeftDown = [event.clientX - 35, event.clientY + 15];
                    var boundRightUp = [event.clientX + 35, event.clientY - 15];
                    var boundRightDown = [event.clientX + 35, event.clientY + 15];
                    if (this.clickImageStatePos) {
                        this.location = event.clientX + '-' + event.clientY;
                        this.clickImageStatePos = false;
                    }
                };
                contentComponent.prototype.ngOnInit = function () {
                };
                contentComponent.prototype.ngOnDestroy = function () {
                    this.contentService.currentReport = this.currentReport;
                };
                contentComponent = __decorate([
                    core_1.Component({
                        selector: 'content',
                        templateUrl: 'app/templates/app.content.template.html',
                        styleUrls: ['app/styles/app.content.style.css']
                    }), 
                    __metadata('design:paramtypes', [app_content_service_1.contentService, router_1.Router])
                ], contentComponent);
                return contentComponent;
            }());
            exports_1("contentComponent", contentComponent);
        }
    }
});
