import {Injectable, Inject} from '@angular/core';
import { Http, Headers, Response} from '@angular/http';

@Injectable()
export class Resource {
    private url: string;
//    private http: Http;
    private headers: Headers = new Headers();
    private methods: Object = {
    };

    constructor(@Inject(Http) public http:Http ) {  
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
            replacedUrl = replacedUrl.replace(new RegExp(paramReplaceKey, 'g'), paramReplaceValue);
        }
        return replacedUrl;
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
            //set default params
            for (var dParamKey in defaultParams) {
                this.methods[methodName].params[dParamKey] = defaultParams[dParamKey];
            }
            //create method without body
            this[methodName] = function (params: Object) {
                let method = this.methods[methodName];    
                let validUrl = method.url ? method.url: this.url;
                let url = this.parseParamAndMakeUrl(validUrl, method.params, methodName);
                return new RequestCallbackHD(url, method.headers, method.method, {}, this.http);
            }

            //create method with body
            this[methodName] = function (params: Object, body) {
                let method = this.methods[methodName];
                let validUrl = method.url ? method.url: this.url;
                let url = this.parseParamAndMakeUrl(validUrl, method.params, methodName);
                return new RequestCallbackHD(url, method.headers, method.method, body, this.http);
            }
        }
        console.log(this)
    }

}

export class RequestCallbackHD {
    public url: string;
    headers: Headers;
    method: string; body: any;
    http: Http
    constructor(url: string, headers: Headers, method: string, body: any, http: Http) {
        this.url = url;
        this.headers = headers;
        this.method = method;
        this.http = http;
        this.body = JSON.stringify(body);
    }
    then(sucessCallback, errCallback) {
        if (this.method === 'get' || this.method === 'delete') {
            this.http[this.method](this.url, this.headers).subscribe((response: Response) => {
                sucessCallback(response.json())
            },
                (error) => {
                    errCallback(error);
                });
        }
        if (this.method === 'post' || this.method === 'put') {
            this.http[this.method](this.url, this.body, this.headers).subscribe((response: Response) => {
                sucessCallback(response.json())
            },
                (error) => {
                    errCallback(error);
                });
        }

    }

}