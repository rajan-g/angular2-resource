import {Injectable, Inject} from '@angular/core';
import {Resource} from 'httpresource/resource';
import { Http, Headers, Response} from '@angular/http';

@Injectable()
export class SampleRestService extends Resource {
//    resource:Resource
    constructor( @Inject(Http) http: Http) {
        super(http);
        this.config('test', {}, {
            getList: {
                method: 'get'                
            }
        });
//        this.config('test', {}, {});
    }
};