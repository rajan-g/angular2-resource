System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, http_1;
    var Resource, RequestCallbackHD;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            Resource = (function () {
                function Resource(http) {
                    this.http = http;
                    //    private http: Http;
                    this.headers = new http_1.Headers();
                    this.methods = {};
                    //        this.http = http;     
                    this.headers.append('Accept', 'application/json');
                    this.headers.append('Content-Type', 'application/json');
                }
                ;
                Resource.prototype.parseParamAndMakeUrl = function (url, params, methodName) {
                    var method = this.methods[methodName];
                    var replacedUrl = url + '';
                    for (var paramkey in method.params) {
                        var paramReplaceValue = params[paramkey];
                        var paramReplaceKey = method.params[paramkey].replace(new RegExp('@', 'g'), ':');
                        replacedUrl = replacedUrl.replace(new RegExp(paramReplaceKey, 'g'), paramReplaceValue);
                    }
                    return replacedUrl;
                };
                Resource.prototype.config = function (url, defaultParams, customMethods) {
                    this.url = url;
                    //merge with default one
                    this.methods = {
                        get: {
                            params: { id: '@id' }, url: this.url, method: 'get', header: this.headers
                        },
                        list: {
                            params: {}, url: this.url, method: 'get', header: this.headers
                        },
                        save: {
                            params: {}, url: this.url, method: 'post', header: this.headers
                        },
                        update: {
                            params: { id: '@id' }, url: this.url, method: 'put', header: this.headers
                        },
                        delete: {
                            params: { id: '@id' }, url: this.url, method: 'delete', header: this.headers
                        }
                    };
                    //merge custom methods with default methods
                    for (var methodName in customMethods) {
                        this.methods[methodName] = customMethods[methodName];
                    }
                    // this.defaultParams = defaultParams;
                    var _loop_1 = function(methodName) {
                        //set default params
                        for (dParamKey in defaultParams) {
                            this_1.methods[methodName].params[dParamKey] = defaultParams[dParamKey];
                        }
                        //create method without body
                        this_1[methodName] = function (params) {
                            var method = this.methods[methodName];
                            var validUrl = method.url ? method.url : this.url;
                            var url = this.parseParamAndMakeUrl(validUrl, method.params, methodName);
                            return new RequestCallbackHD(url, method.headers, method.method, {}, this.http);
                        };
                        //create method with body
                        this_1[methodName] = function (params, body) {
                            var method = this.methods[methodName];
                            var validUrl = method.url ? method.url : this.url;
                            var url = this.parseParamAndMakeUrl(validUrl, method.params, methodName);
                            return new RequestCallbackHD(url, method.headers, method.method, body, this.http);
                        };
                    };
                    var this_1 = this;
                    var dParamKey;
                    for (var methodName in this.methods) {
                        _loop_1(methodName);
                    }
                    console.log(this);
                };
                Resource = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Resource);
                return Resource;
            }());
            exports_1("Resource", Resource);
            RequestCallbackHD = (function () {
                function RequestCallbackHD(url, headers, method, body, http) {
                    this.url = url;
                    this.headers = headers;
                    this.method = method;
                    this.http = http;
                    this.body = JSON.stringify(body);
                }
                RequestCallbackHD.prototype.then = function (sucessCallback, errCallback) {
                    if (this.method === 'get' || this.method === 'delete') {
                        this.http[this.method](this.url, this.headers).subscribe(function (response) {
                            sucessCallback(response.json());
                        }, function (error) {
                            errCallback(error);
                        });
                    }
                    if (this.method === 'post' || this.method === 'put') {
                        this.http[this.method](this.url, this.body, this.headers).subscribe(function (response) {
                            sucessCallback(response.json());
                        }, function (error) {
                            errCallback(error);
                        });
                    }
                };
                return RequestCallbackHD;
            }());
            exports_1("RequestCallbackHD", RequestCallbackHD);
        }
    }
});
//# sourceMappingURL=resource.js.map