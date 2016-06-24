import {Injectable, Inject} from '@angular/core';
import {Resource} from './httpresource/resource';
import { Http, Headers, Response} from '@angular/http';
import {AjaxInterceptor} from './httpresource/ajax-interceptor';

@Injectable()
export class SampleRestService extends Resource {
//    resource:Resource
    constructor( @Inject(Http) http: Http, ajaxInterceptor:AjaxInterceptor) {
        super(http,ajaxInterceptor);
        this.config('/user/:id', {id:'@id'}, {
            getList: {
                method: 'get'                
            },
            saveMyData:{
              params: { id: '@id'}, 
              url: 'customer/:id',
              method: 'post',
              header: {'contentType': 'application/json', 'custom-key':'sample value'} 
            }
        });
    }
};