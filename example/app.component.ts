/* 
 * @author RAJAN G
 */

import {Component} from '@angular/core';
import {SampleRestService} from './sample-restservice';
import {InterceptorConfig} from './interceptor-config';
import {AjaxInterceptor} from '../httpresource';

@Component({
  selector: 'my-app',
//  directives: [],
  providers: [SampleRestService],
  template: `sample rest service`

})
export class AppComponent {
  constructor(private sampleRestService: SampleRestService, private interceptorConfig: InterceptorConfig, ajaxInterceptor:AjaxInterceptor) {    
    this.sampleRestOperations();
    this.interceptorConfig.invoke(ajaxInterceptor);
  }
  
  sampleRestOperations() {
    //default method
    this.sampleRestService['save']({}, { id: 'sampledata' }).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
    //default method
    this.sampleRestService['update']({'id': '12'}, { id: 'sampledata' }).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
    //default method
    this.sampleRestService['get']({}).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
    //default method
    this.sampleRestService['list']({}).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
    
    //custome method
    this.sampleRestService['saveMyData']({'id': '12'}, { id: 'sampledata' }).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
     //custome method
    this.sampleRestService['getList']({}, { id: 'sampledata' }).then((data) => {
      console.log("Data", data);
    }, (error) => {
      console.log("Data", error);
    });
//    this.sampleRestService['getExample']().then((data, status) => {
//      console.log("Data", data, "status", status);
//    }, (error, status) => {
//      console.log("Data", error, "status", status);
//    });
  }
}
