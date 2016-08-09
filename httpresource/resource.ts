import {Injectable, Inject} from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {AjaxInterceptor} from './ajax-interceptor';

@Injectable()
export class Resource {
    private url: string;
    //    private http: Http;
    private headers: Object = {};
    private methods: Object = {
    };

    constructor( @Inject(Http) public http: Http, @Inject(AjaxInterceptor) public ajaxInterceptor: AjaxInterceptor) {
        //        this.http = http;     
        this.headers['Accept'] = 'application/json';
        this.headers['Content-Type']= 'application/json';
    };
    parseParamAndMakeUrl(url: string, params: Object, methodName) {
        let method = this.methods[methodName];
        let replacedUrl = url + '';
        for (let paramkey in method.params) {
            let paramReplaceValue = params[paramkey];
            let paramReplaceKey = method.params[paramkey].replace(new RegExp('@', 'g'), ':')
            if (!paramReplaceValue) {
                paramReplaceValue = '';
            }
            replacedUrl = replacedUrl.replace(new RegExp(paramReplaceKey, 'g'), paramReplaceValue);
        }
        return replacedUrl;
    };

    headerConfig(header) {
        let newHeader = {};
        if (header) {
            for (let hKey in header) {
                newHeader[hKey] = header[hKey];
            }
        } else {
            newHeader = this.headers;
        }
        return newHeader;
    }

    config(url, defaultParams, customMethods) {
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
        for (let methodName in customMethods) {
            this.methods[methodName] = customMethods[methodName];
        }
        // this.defaultParams = defaultParams;
        for (let methodName in this.methods) {
            if(!this.methods[methodName].params) {
                this.methods[methodName].params = {};
            }
            //set default params
            for (var dParamKey in defaultParams) {
                this.methods[methodName].params[dParamKey] = defaultParams[dParamKey];
            }
            //create method without body and params
            this[methodName] = function () {
                let method = this.methods[methodName];
                let validUrl = method.url ? method.url : this.url;
                let header: Headers = this.headerConfig(method.header);
                let params = {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, {}, this.http, this.ajaxInterceptor);
            };

            //create method with param only
            this[methodName] = function (params: Object) {
                let method = this.methods[methodName];
                let validUrl = method.url ? method.url : this.url;
                let header: Headers = this.headerConfig(method.header);
                params = params ? params : {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, {}, this.http, this.ajaxInterceptor);
            };

            //create method with body
            this[methodName] = function (params: Object, body) {
                let method = this.methods[methodName];
                let validUrl = method.url ? method.url : this.url;
                let header: Headers = this.headerConfig(method.header);
                params = params ? params : {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, body, this.http, this.ajaxInterceptor);
            };
        }
    }

}

export class RequestCallbackHD {
    public url: string;
    public ajaxInterceptor: AjaxInterceptor;
    public headers: Headers;
    method: string; body: any;
    http: Http;
    STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    ARGUMENT_NAMES = /([^\s,]+)/g;
    constructor(url: string, headers: Headers, method: string, body: any, http: Http, ajaxInterceptor: AjaxInterceptor) {
        this.url = url;
        this.method = method;
        this.http = http;
        this.headers = new Headers(headers);
        this.ajaxInterceptor = ajaxInterceptor;
        this.body = JSON.stringify(body);
    }
    then(sucessCallback, errCallback) {
        let options = new RequestOptions({ headers: this.headers });
        if (this.ajaxInterceptor.beforeRequest) {
            this.ajaxInterceptor.beforeRequest(this);
        }
        if (this.method === 'get' || this.method === 'delete') {
            this.http[this.method](this.url, options).subscribe((response: Response) => {
                if (this.ajaxInterceptor.afterResponseSuccess) {
                    this.ajaxInterceptor.afterResponseSuccess(response);
                }
                this.invokeCallback(sucessCallback, response);          
            },
                (error) => {
                    if (this.ajaxInterceptor.afterResponseError) {
                        this.ajaxInterceptor.afterResponseError(error);
                    }
                    this.invokeCallback(errCallback, error);
                });
        } else if (this.method === 'post' || this.method === 'put') {
            this.http[this.method](this.url, this.body, options).subscribe((response: Response) => {
                if (this.ajaxInterceptor.afterResponseSuccess) {
                    this.ajaxInterceptor.afterResponseSuccess(response);
                }
                this.invokeCallback(sucessCallback, response);
            },
                (error) => {
                    if (this.ajaxInterceptor.afterResponseError) {
                        this.ajaxInterceptor.afterResponseError(error);
                    }
                    this.invokeCallback(errCallback, error);
                });
        } else {
            this.http[this.method](this.url, this.body, options).subscribe((response: Response) => {
                if (this.ajaxInterceptor.afterResponseSuccess) {
                    this.ajaxInterceptor.afterResponseSuccess(response);
                }
                this.invokeCallback(sucessCallback, response);
            },
                (error) => {
                    if (this.ajaxInterceptor.afterResponseError) {
                        this.ajaxInterceptor.afterResponseError(error);
                    }
                    this.invokeCallback(errCallback, error);
                });
        }

    }    
    
    invokeCallback(callback, response) {
      let params = this.getParamNames(callback);
      let jsonData;
      if(!params) {
        return;
      }
      if (response.text() === '' || !response.text()) {
        jsonData = response.text();
      } else {
      try{
        jsonData = response.json();
      }
        catch(e) {
          jsonData = response.text();
        }
      }
      if(params.length === 1) {
        callback(jsonData);
        return;
      }
      if(params.length >1) {
        callback(jsonData, response);
        return;
      }
    };
    getParamNames(func) {
      if(!func) {
        return null;
      }
      var fnStr = func.toString().replace(this.STRIP_COMMENTS, '');
      var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES);
      if (result === null)
        result = [];
      return result;
    }

}