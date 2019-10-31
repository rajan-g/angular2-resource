System.register(["@angular/core", "@angular/http", "./ajax-interceptor"], function (exports_1, context_1) {
    "use strict";
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
    var core_1, http_1, ajax_interceptor_1, Resource, RequestCallbackHD;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ajax_interceptor_1_1) {
                ajax_interceptor_1 = ajax_interceptor_1_1;
            }
        ],
        execute: function () {
            Resource = /** @class */ (function () {
                function Resource(http, ajaxInterceptor) {
                    this.http = http;
                    this.ajaxInterceptor = ajaxInterceptor;
                    //    private http: Http;
                    this.headers = {};
                    this.methods = {};
                    //        this.http = http;     
                    this.headers['Accept'] = 'application/json';
                    this.headers['Content-Type'] = 'application/json';
                }
                ;
                Resource.prototype.parseParamAndMakeUrl = function (url, paramsObj, methodName, argumentLength) {
                    var method = this.methods[methodName];
                    var params = JSON.parse(JSON.stringify(paramsObj));
                    var replacedUrl = url + '';
                    var missingParam = '';
                    for (var paramkey in method.params) {
                        var paramReplaceValue = params[paramkey];
                        var paramReplaceKey = method.params[paramkey].replace(new RegExp('@', 'g'), ':');
                        if (paramReplaceValue === undefined || paramReplaceValue === null) {
                            paramReplaceValue = '';
                        }
                        replacedUrl = replacedUrl.replace(new RegExp(paramReplaceKey, 'g'), paramReplaceValue);
                        delete params[paramkey];
                    }
                    for (var key in params) {
                        if (params[key] !== undefined && params[key] !== null && argumentLength === 2) {
                            missingParam += '&' + key + '=' + params[key];
                        }
                    }
                    if (replacedUrl && replacedUrl.indexOf('?') != -1 && missingParam != '') {
                        replacedUrl += missingParam;
                    }
                    else if (replacedUrl && missingParam != '') {
                        missingParam = missingParam.substring(1, missingParam.length);
                        replacedUrl += '?' + missingParam;
                    }
                    return replacedUrl;
                };
                ;
                Resource.prototype.headerConfig = function (header) {
                    var newHeader = {};
                    if (header) {
                        for (var hKey in header) {
                            newHeader[hKey] = header[hKey];
                        }
                    }
                    else {
                        newHeader = this.headers;
                    }
                    return newHeader;
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
                    var _loop_1 = function (methodName) {
                        if (!this_1.methods[methodName].params) {
                            this_1.methods[methodName].params = {};
                        }
                        //set default params
                        for (var dParamKey in defaultParams) {
                            this_1.methods[methodName].params[dParamKey] = defaultParams[dParamKey];
                        }
                        //create method without body and params
                        this_1[methodName] = function () {
                            var method = this.methods[methodName];
                            var validUrl = method.url ? method.url : this.url;
                            var header = this.headerConfig(method.header);
                            var params = {};
                            var body = {};
                            if (arguments.length == 1) {
                                params = arguments[0];
                                body = arguments[0];
                            }
                            if (arguments.length == 2) {
                                params = arguments[0];
                                body = arguments[1];
                            }
                            var url = this.parseParamAndMakeUrl(validUrl, params, methodName, arguments.length);
                            return new RequestCallbackHD(url, header, method.method, body, this.http, this.ajaxInterceptor);
                        };
                    };
                    var this_1 = this;
                    // this.defaultParams = defaultParams;
                    for (var methodName in this.methods) {
                        _loop_1(methodName);
                    }
                };
                Resource = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)), __param(1, core_1.Inject(ajax_interceptor_1.AjaxInterceptor)),
                    __metadata("design:paramtypes", [http_1.Http, ajax_interceptor_1.AjaxInterceptor])
                ], Resource);
                return Resource;
            }());
            exports_1("Resource", Resource);
            RequestCallbackHD = /** @class */ (function () {
                function RequestCallbackHD(url, headers, method, body, http, ajaxInterceptor) {
                    this.STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
                    this.ARGUMENT_NAMES = /([^\s,]+)/g;
                    this.url = url;
                    this.method = method ? method.toLowerCase() : 'get';
                    this.http = http;
                    this.headers = new http_1.Headers(headers);
                    this.ajaxInterceptor = ajaxInterceptor;
                    this.body = JSON.stringify(body);
                }
                RequestCallbackHD.prototype.then = function (sucessCallback, errCallback) {
                    var _this = this;
                    var options = new http_1.RequestOptions({ headers: this.headers });
                    if (this.ajaxInterceptor.beforeRequest) {
                        this.ajaxInterceptor.beforeRequest(this);
                    }
                    if (this.method === 'get' || (this.method === 'delete' && !this.body)) {
                        this.http[this.method](this.url, options).subscribe(function (response) {
                            if (_this.ajaxInterceptor.afterResponseSuccess) {
                                _this.ajaxInterceptor.afterResponseSuccess(response);
                            }
                            _this.invokeCallback(sucessCallback, response);
                        }, function (error) {
                            if (_this.ajaxInterceptor.afterResponseError) {
                                _this.ajaxInterceptor.afterResponseError(error);
                            }
                            _this.invokeCallback(errCallback, error);
                        });
                    }
                    else if (this.method === 'post' || this.method === 'put' || this.method === 'patch' || (this.method === 'delete' && this.body)) {
                        this.http[this.method](this.url, this.body, options).subscribe(function (response) {
                            if (_this.ajaxInterceptor.afterResponseSuccess) {
                                _this.ajaxInterceptor.afterResponseSuccess(response);
                            }
                            _this.invokeCallback(sucessCallback, response);
                        }, function (error) {
                            if (_this.ajaxInterceptor.afterResponseError) {
                                _this.ajaxInterceptor.afterResponseError(error);
                            }
                            _this.invokeCallback(errCallback, error);
                        });
                    }
                    else {
                        this.http[this.method](this.url, this.body, options).subscribe(function (response) {
                            if (_this.ajaxInterceptor.afterResponseSuccess) {
                                _this.ajaxInterceptor.afterResponseSuccess(response);
                            }
                            _this.invokeCallback(sucessCallback, response);
                        }, function (error) {
                            if (_this.ajaxInterceptor.afterResponseError) {
                                _this.ajaxInterceptor.afterResponseError(error);
                            }
                            _this.invokeCallback(errCallback, error);
                        });
                    }
                };
                RequestCallbackHD.prototype.invokeCallback = function (callback, response) {
                    var params = this.getParamNames(callback);
                    var jsonData;
                    if (!params) {
                        return;
                    }
                    if (response.text() === '' || !response.text()) {
                        jsonData = response.text();
                    }
                    else {
                        try {
                            jsonData = response.json();
                        }
                        catch (e) {
                            jsonData = response.text();
                        }
                    }
                    if (params.length === 1) {
                        callback(jsonData);
                        return;
                    }
                    if (params.length > 1) {
                        callback(jsonData, response);
                        return;
                    }
                };
                ;
                RequestCallbackHD.prototype.getParamNames = function (func) {
                    if (!func) {
                        return null;
                    }
                    var fnStr = func.toString().replace(this.STRIP_COMMENTS, '');
                    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES);
                    if (result === null)
                        result = [];
                    return result;
                };
                return RequestCallbackHD;
            }());
            exports_1("RequestCallbackHD", RequestCallbackHD);
        }
    };
});
//# sourceMappingURL=resource.js.map