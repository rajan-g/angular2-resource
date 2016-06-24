import {Injectable} from '@angular/core';

@Injectable()
export class AjaxInterceptor {
    public beforeRequest:any;
    public afterResponseSuccess:any;
    public afterResponseError:any;
    constractor(){
        
    }
    config(beforeRequest, afterResponseSuccess, afterResponseError) {
      this.beforeRequest = beforeRequest;
      this.afterResponseSuccess = afterResponseSuccess;
      this.afterResponseError = afterResponseError;
    }
}