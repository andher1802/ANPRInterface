System.register(['@angular/core'], function(exports_1, context_1) {
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
    var core_1;
    var SideButtonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            SideButtonComponent = (function () {
                function SideButtonComponent() {
                    this.currentState = 'showState';
                    this.myState = new core_1.EventEmitter();
                }
                SideButtonComponent.prototype.sendState = function (evt) {
                    if (this.currentState == 'showState') {
                        this.currentState = 'hiddenState';
                    }
                    else {
                        this.currentState = 'showState';
                    }
                    this.myState.next([this.currentState]);
                };
                __decorate([
                    core_1.Output('myState'), 
                    __metadata('design:type', Object)
                ], SideButtonComponent.prototype, "myState", void 0);
                SideButtonComponent = __decorate([
                    core_1.Component({
                        selector: 'side-button',
                        templateUrl: 'app/templates/app.side-buttons.template.html',
                        styleUrls: ['app/styles/app.side-buttons.style.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SideButtonComponent);
                return SideButtonComponent;
            }());
            exports_1("SideButtonComponent", SideButtonComponent);
        }
    }
});
