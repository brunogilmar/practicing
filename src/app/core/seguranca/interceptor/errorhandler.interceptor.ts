import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { mensagens } from '../../../shared/util/mensagens';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private messageService: MessageService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
            },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        switch (err.status) {
                            case 400:
                                this.messageService.add({
                                    severity: 'warn',
                                    summary: 'Atenção',
                                    detail: err.error[0].message
                                });
                                break;
                            case 403:
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Acesso negado',
                                    detail: 'Você não tem permissão para acessar'
                                });
                                break;
                            case 500:
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Atenção',
                                    detail: err.error[0].message
                                });
                                break;

                            default:
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Atenção',
                                    detail: this.mensagemDefault(err)
                                });
                                break;

                        }
                    }
                }
            )
        );
    }

    mensagemDefault(err: HttpErrorResponse) {
        let mensagem = 'Ocorreu um erro ao processar a requisição. Por favor tente mais tarde.';
        return mensagem;
    }
}
