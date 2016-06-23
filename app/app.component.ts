/* 
 * @author RAJAN G
 */

import {Component, Inject } from '@angular/core';
import {SampleRestService} from './sample-restservice';

@Component({
    selector: 'my-app',
    directives: [],
    providers:[SampleRestService],
    template: `sample rest service`
   
})
export class AppComponent{
    constructor(@Inject(SampleRestService)sampleRestService: SampleRestService) {
        console.log(  sampleRestService['getList']);
        sampleRestService['getList']({},{id:'sampledata'}).then((data)=> {
            console.log("Data", data);
        },(error)=> {
            console.log("Data", error);
        })
    }
}
