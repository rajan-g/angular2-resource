import {Injectable, Inject} from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import {AjaxInterceptor} from './ajax-interceptor';

@Injectable()
export class Resource {
    private url: string;
//    private http: Http;
    private headers: Headers = new Headers();
    private methods: Object = {
    };

    constructor(@Inject(Http) public http:Http , @Inject(AjaxInterceptor) public ajaxInterceptor:AjaxInterceptor) {  
//        this.http = http;     
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
    };
      parseParamAndMakeUrl(url: string, params: Object, methodName) {
        let method = this.methods[methodName];
        let replacedUrl = url + '';
        for (let paramkey in method.params) {
            let paramReplaceValue = params[paramkey];
            let paramReplaceKey = method.params[paramkey].replace(new RegExp('@', 'g'), ':')
            if(!paramReplaceValue) {
              paramReplaceValue = '';
            }
            replacedUrl = replacedUrl.replace(new RegExp(paramReplaceKey, 'g'), paramReplaceValue);
        }
        return replacedUrl;
    };
    
    headerConfig(header) {
      let newHeader = new Headers();
      if(header) {
        for(let hKey in header) {
          newHeader.append(hKey, header[hKey]);
        }
      }else {
        newHeader = this.headers;
      }
      return newHeader;
    }

   config(url, defaultParams, customMethods) {       
        this.url = url;
        //merge with default one
        this.methods = {
            get: {
                params: { id: '@id'}, url: this.url, method: 'get', header: this.headers 
            },
            list: {
                params: {}, url: this.url, method: 'get', header: this.headers 
            },
            save: {
                params: { }, url: this.url, method: 'post', header: this.headers 
            },
            update: {
                params: { id: '@id'}, url: this.url, method: 'put', header: this.headers 
            },
            delete: {
                params: { id: '@id'}, url: this.url, method: 'delete', header: this.headers
            }
        };
        //merge custom methods with default methods
        for (let methodName in customMethods) {
            this.methods[methodName] = customMethods[methodName];
        }
        // this.defaultParams = defaultParams;
        for (let methodName in this.methods) {
            this.methods[methodName].params = {};
            //set default params
            for (var dParamKey in defaultParams) {
                this.methods[methodName].params[dParamKey] = defaultParams[dParamKey];
            }
            //create method without body and params
            this[methodName] = function () {
                let method = this.methods[methodName];    
                let validUrl = method.url ? method.url: this.url;
                let header:Headers = this.headerConfig(method.header);
                let params =  {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, {}, this.http, this.ajaxInterceptor);
            };
            
             //create method with param only
            this[methodName] = function (params: Object) {
                let method = this.methods[methodName];    
                let validUrl = method.url ? method.url: this.url;
                let header:Headers = this.headerConfig(method.header);
                params = params ? params: {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, {}, this.http, this.ajaxInterceptor);
            };

            //create method with body
            this[methodName] = function (params: Object, body) {
                let method = this.methods[methodName];
                let validUrl = method.url ? method.url: this.url;
                let header:Headers = this.headerConfig(method.header);
                params = params ? params: {};
                let url = this.parseParamAndMakeUrl(validUrl, params, methodName);
                return new RequestCallbackHD(url, header, method.method, body, this.http, this.ajaxInterceptor);
            };
        }
    }

}

export class RequestCallbackHD {
    public url: string;
    public ajaxInterceptor:AjaxInterceptor;
    public headers: Headers;
    method: string; body: any;
    http: Http
    constructor(url: string, headers: Headers, method: string, body: any, http: Http, ajaxInterceptor: AjaxInterceptor) {
        this.url = url;
        this.method = method;
        this.http = http;
        this.headers = headers;
        this.ajaxInterceptor = ajaxInterceptor;
        this.body = JSON.stringify(body);
    }
    then(sucessCallback, errCallback) {
          if (this.ajaxInterceptor.beforeRequest) { 
            this.ajaxInterceptor.beforeRequest(this);
          }
        if (this.method === 'get' || this.method === 'delete') {
            this.http[this.method](this.url, this.headers).subscribe((response: Response) => {
              if (this.ajaxInterceptor.afterResponseSuccess) {
                this.ajaxInterceptor.afterResponseSuccess(response);
              }
                sucessCallback(response.json())
            },
                (error) => {
                  if (this.ajaxInterceptor.afterResponseSuccess) {
                    this.ajaxInterceptor.afterResponseSuccess(error);
                  }
                    errCallback(error);
                });
        }
        if (this.method === 'post' || this.method === 'put') {
            this.http[this.method](this.url, this.body, this.headers).subscribe((response: Response) => {
              if (this.ajaxInterceptor.afterResponseSuccess) {
                this.ajaxInterceptor.afterResponseSuccess(response);
              }
                sucessCallback(response.json())
            },
                (error) => {
                  if (this.ajaxInterceptor.afterResponseSuccess) {
                    this.ajaxInterceptor.afterResponseSuccess(error);
                  }
                    errCallback(error);
                });
        }

    }

}