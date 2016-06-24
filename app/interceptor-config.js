/*
 * @author RAJAN G
 */
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
    var InterceptorConfig;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            InterceptorConfig = (function () {
                function InterceptorConfig() {
                }
                InterceptorConfig.prototype.invoke = function (ajaxInterceptor) {
                    //invoke interceptor
                    ajaxInterceptor.config(this.onBeforRequest, this.onAfterResponse, this.onAfterResponseError);
                };
                InterceptorConfig.prototype.onBeforRequest = function (requestCall) {
                    console.log('new header adde');
                    requestCall.headers.append('Accept', 'application/json');
                    requestCall.headers.append('Content-Type', 'application/json');
                    requestCall.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
                    return requestCall;
                };
                InterceptorConfig.prototype.onAfterResponse = function (response) {
                    console.log('response', response);
                };
                InterceptorConfig.prototype.onAfterResponseError = function (error) {
                    console.log('error', error);
                };
                InterceptorConfig = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], InterceptorConfig);
                return InterceptorConfig;
            }());
            exports_1("InterceptorConfig", InterceptorConfig);
        }
    }
});
//# sourceMappingURL=interceptor-config.js.map