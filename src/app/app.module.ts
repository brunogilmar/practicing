import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppAsideModule, AppBreadcrumbModule, AppHeaderModule, AppFooterModule, AppSidebarModule, } from '@coreui/angular';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './core/containers';

import { P404Component } from './core/error/404.component';
import { P500Component } from './core/error/500.component';
import { LoginComponent } from './core/login/login.component';

const APP_CONTAINERS = [
    DefaultLayoutComponent
];

// Import routing module
import { AppRoutingModule } from './app.routing';

import { CoreModule } from './core/core.module';
import { BlockUIModule } from 'ng-block-ui';
import { MessageUtil } from './shared/util/message.util';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxWebstorageModule.forRoot(),
        PerfectScrollbarModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        ToastModule,
        BlockUIModule.forRoot({
            message: MessageUtil.CARREGANDO_TELA
        }),

        AppRoutingModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        P404Component,
        P500Component,
        LoginComponent,
    ],
    providers: [
        MessageService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
