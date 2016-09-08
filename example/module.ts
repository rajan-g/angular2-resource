import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Resource} from '../httpresource/resource';
import {AjaxInterceptor} from '../httpresource/ajax-interceptor';
import {InterceptorConfig} from './interceptor-config';
import { AppComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, HttpModule],
  declarations: [ AppComponent ],
  providers: [AjaxInterceptor, InterceptorConfig],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }