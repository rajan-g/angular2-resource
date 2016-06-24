System.register(['@angular/core', './httpresource/resource', '@angular/http', './httpresource/ajax-interceptor'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, resource_1, http_1, ajax_interceptor_1;
    var SampleRestService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (resource_1_1) {
                resource_1 = resource_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ajax_interceptor_1_1) {
                ajax_interceptor_1 = ajax_interceptor_1_1;
            }],
        execute: function() {
            SampleRestService = (function (_super) {
                __extends(SampleRestService, _super);
                //    resource:Resource
                function SampleRestService(http, ajaxInterceptor) {
                    _super.call(this, http, ajaxInterceptor);
                    this.config('/user/:id', { id: '@id' }, {
                        getList: {
                            method: 'get'
                        },
                        saveMyData: {
                            params: { id: '@id' },
                            url: 'customer/:id',
                            method: 'post',
                            header: { 'contentType': 'application/json', 'custom-key': 'sample value' }
                        }
                    });
                }
                SampleRestService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(http_1.Http)), 
                    __metadata('design:paramtypes', [http_1.Http, ajax_interceptor_1.AjaxInterceptor])
                ], SampleRestService);
                return SampleRestService;
            }(resource_1.Resource));
            exports_1("SampleRestService", SampleRestService);
            ;
        }
    }
});
//# sourceMappingURL=sample-restservice.js.map