/* 
 * @author RAJAN G
 */

import {Injectable} from '@angular/core';
import {AjaxInterceptor} from '../httpresource';

@Injectable()
export class InterceptorConfig {
  constructor() {    
     
  }
  invoke(ajaxInterceptor: AjaxInterceptor) {
    //invoke interceptor
    ajaxInterceptor.config(this.onBeforRequest, this.onAfterResponse, this.onAfterResponseError);   
  }
  
  onBeforRequest(requestCall:any) {
     console.log('new header adde');
    requestCall.headers.append('Accept', 'application/json');
    requestCall.headers.append('Content-Type', 'application/json');
    requestCall.headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return requestCall;
  }
  onAfterResponse(response) {
    console.log('response', response);
  }
  onAfterResponseError(error) {
     console.log('error', error);
  }
}
