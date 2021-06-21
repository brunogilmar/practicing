import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { ErrorHandlerInterceptor } from './seguranca/interceptor/errorhandler.interceptor';
import { AuthExpiredInterceptor } from './seguranca/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './seguranca/interceptor/auth.interceptor';
import { SharedModule as AppSharedModule } from '../shared/shared.module';
import { BaseLoaderInterceptorService } from '../shared/abstract/base-loader-interceptor.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        AppSharedModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BaseLoaderInterceptorService,
            multi: true
        },
    ],
    exports: [],
})
export class CoreModule {
}
