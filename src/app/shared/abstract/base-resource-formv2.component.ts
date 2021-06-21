import { Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BaseResourceModel } from './../abstract/base-resource.model';
import { BaseResourceService } from './../abstract/base-resource.service';
import { MessageService } from 'primeng/api';
import { AcaoPageEnum } from '../util/enum/acao-page.enum';
import { AutorizacaoService } from '../../core/seguranca/autorizacao.service';

export abstract class BaseResourceFormV2Component<T extends BaseResourceModel> implements OnInit {

    formCadastro: FormGroup;

    currentAction: string;
    visualizar: boolean = false;
    submittingForm: boolean = false;
    formLoad: Subject<boolean> = new Subject();
    messageService: MessageService;
    auth: AutorizacaoService;
    protected route: ActivatedRoute;

    protected constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.messageService = this.injector.get(MessageService);
        this.auth = this.injector.get(AutorizacaoService);
    }

    ngOnInit() {
        this.loadForm(null);
        this.setCurrentAction();
    }

    loadForm(resource: T) {
        this.formCadastro.patchValue(resource);
    }

    submitForm() {
        this.submittingForm = true;
        if (this.formCadastro.valid) {
            if (this.currentAction === AcaoPageEnum.CADASTRAR) {
                this.createResource();
            } else {
                this.updateResource();
            }
        } else {
            this.msgValidacaoFormulario();
        }
    }

    verificaPermissao(acao: string) {
        if(!this.auth.getPermissoes(acao)) {
            this.voltar();
        }
    }

    limpaForm() {
        this.submittingForm = false;
        this.formCadastro.reset();
    }

    voltar() {
        window.history.back();
    }

    // PRIVATE METHODS
    protected setCurrentAction() {
        this.currentAction = this.route.snapshot.data.title;

        if(this.currentAction === AcaoPageEnum.CADASTRAR) {
            this.verificaPermissao('CADASTRAR_CLIENTE');
        }

        if(this.currentAction === AcaoPageEnum.ALTERAR) {
            this.verificaPermissao('ALTERAR_CLIENTE');
            this.loadResource();
        }

        if(this.currentAction === AcaoPageEnum.VISUALIZAR) {
            this.loadResource();
            this.formCadastro.disable();
        }
    }

    protected loadResource() {
        this.route.data.subscribe(
            (data) => {
                if (data.dto) {
                    this.bindResource(data.dto);
                } else {
                    const paramMap = this.route.snapshot.paramMap.get('id');
                    const resourceId = paramMap ? paramMap : null;
                    if (resourceId !== null) {
                        this.route.paramMap.pipe(
                            switchMap(params => this.loadObjectEdit(params))
                            )
                            .subscribe(
                                (resource) => {
                                    this.bindResource(resource);
                                },
                                (error) => {
                                    throw new Error('Ocorreu um erro interno. Por favor tente mais tarde.');
                                }
                            );
                    }
                }
            }
        );
    }

    protected bindResource(resource: T) {
        this.resource = resource;
        this.loadForm(resource);
    }

    protected loadObjectEdit(params: any): Observable<T> {
        return this.resourceService.getById(params.get('id'));
    }

    protected createResource() {
        this.resourceService.create(this.formCadastro.value)
            .subscribe(
                r => {
                    this.actionsSaveSuccess(r);
                    //this.voltar();
        });
    }

    protected msgValidacaoFormulario() {
        this.messageService.add({
            severity: 'error',
            summary: 'Mensagem',
            detail: 'Atenção para os campos obrigatórios.'
        });
    }

    protected updateResource() {
        this.resourceService.update(this.formCadastro.value)
            .subscribe(
                r => {
                    this.actionsUpdadeSuccess(r);
                    //this.voltar();
                }
            );
    }

    protected actionsSaveSuccess(resource: T) {
        this.messageService.add(
            {
                severity: 'success',
                summary: 'Mensagem',
                detail: 'Cadastro realizado com sucesso!'
            }
        );
    }

    protected actionsUpdadeSuccess(resource: T) {
        this.messageService.add(
            {
                severity: 'success',
                summary: 'Mensagem',
                detail: 'Cadastro atualizado com sucesso!'
            }
        );
    }

}
