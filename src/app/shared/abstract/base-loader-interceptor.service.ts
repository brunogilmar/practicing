import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseLoaderInterceptorService implements HttpInterceptor {

    @BlockUI() blockUI: NgBlockUI;

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.blockUI.start();
        return next.handle(req).pipe(
            finalize(() => this.blockUI.stop())
        );
    }
}
