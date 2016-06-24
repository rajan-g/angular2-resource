System.register(['@angular/platform-browser-dynamic', '@angular/http', './app.component', './httpresource/resource', './httpresource/ajax-interceptor', './interceptor-config'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, app_component_1, resource_1, ajax_interceptor_1, interceptor_config_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (ajax_interceptor_1_1) {
                ajax_interceptor_1 = ajax_interceptor_1_1;
            },
            function (interceptor_config_1_1) {
                interceptor_config_1 = interceptor_config_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, resource_1.Resource, ajax_interceptor_1.AjaxInterceptor, interceptor_config_1.InterceptorConfig]);
        }
    }
});
//# sourceMappingURL=main.js.map