# angular2-resource and ajax interceptor
angular2-resource and ajax interceptor is service helper class. You can extends and enjoy like angular 1 resource feature

The sources for this package are in (https://github.com/rajan-g/angular2-resource.git) repo. Please file issues and pull requests against that repo.

### Live Demo
[Live Demo Site](http://www.angular2modules.com/resource "Live Demo Site For Resource ")
OR
[Live Demo Site](http://www.angular2modules.com "Live Demo Site For Letter Resource ")

### Install from npm
```sh
        npm install angular2-resource-and-ajax-interceptor
```
### Example file usage main.ts
```javascript
      import { bootstrap }    from '@angular/platform-browser-dynamic';
      import { HTTP_PROVIDERS } from '@angular/http';
      import {AppComponent} from './app.component';
      import {Resource} from './httpresource/resource';
      import {AjaxInterceptor} from './httpresource/ajax-interceptor';
      import {InterceptorConfig} from './interceptor-config';

      bootstrap(AppComponent,[HTTP_PROVIDERS, Resource, AjaxInterceptor,InterceptorConfig])

```
### resource extend by sampe-resetservice.ts
```typescript
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
```

### ajax interceptor configuration interceptor-config.ts(note: if you don't like interceptor no need to use this files)
```typescript
    import {Injectable} from '@angular/core';
    import {AjaxInterceptor} from './httpresource/ajax-interceptor';

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
```

### finnaly app.component.ts
```typescript
    import {Component} from '@angular/core';
    import {SampleRestService} from './sample-restservice';
    import {InterceptorConfig} from './interceptor-config';
    import {AjaxInterceptor} from './httpresource/ajax-interceptor';

    @Component({
      selector: 'my-app',
      directives: [],
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
      }
    }
```

### For Test demo
 - Download this module
 - Run following command
    ```
    npm install
    npm start
    ```       

