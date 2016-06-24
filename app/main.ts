import { bootstrap }    from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import {AppComponent} from './app.component';
import {Resource} from './httpresource/resource';
import {AjaxInterceptor} from './httpresource/ajax-interceptor';
import {InterceptorConfig} from './interceptor-config';

bootstrap(AppComponent,[HTTP_PROVIDERS, Resource, AjaxInterceptor,InterceptorConfig])
