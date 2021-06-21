import { Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { BaseResourceModel } from './base-resource.model';
import { BaseResourceService } from './base-resource.service';
import { FiltroParams } from '../util/model/filtroParams';
import { Sort } from '../util/model/sort';

export abstract class BaseResourceListV2Component<T extends BaseResourceModel> implements OnInit {

    formFiltro: FormGroup;
    resources: T[] = [];
    searchWithMessage = true;

    coluna: string;
    direction = 0;
    sort: Sort;
    totalRegistro = 0;
    paginaAtual = 0;

    route: ActivatedRoute;
    router: Router;

    readonly ITENS_POR_PAGINA = environment.itensPorPagina;
    messageService: MessageService;

    protected constructor(
        protected injector: Injector,
        private resourceService: BaseResourceService<T>
    ) {
        this.route = injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.messageService = injector.get(MessageService);
    }

    ngOnInit() {
        this.onLoadList();
    }

    abstract onLoadList();

    pesquisa(event?: LazyLoadEvent) {
        if (event) {
            this.paginaAtual = event.first / event.rows;
        } else {
            this.paginaAtual = 0;
        }

        this.resourceService.searchPageable(this.formFiltro.value,
            new FiltroParams(this.paginaAtual.toString(), this.sort).params)
            .pipe(take(1))
            .subscribe(
                resultado => {
                    this.resources = [];
                    this.resources = resultado.content;
                    this.totalRegistro = resultado.totalElements;
                    if (resultado.totalElements === 0) {
                        this.messageService.add(
                            {
                                severity: 'info',
                                summary: 'Mensagem',
                                detail: 'Nenhum registro encontrado.',
                                life: 3000
                            }
                        );
                    }
                    this.searchWithMessage = true;

                });
    }

    limpaForm() {
        this.formFiltro.reset();
        this.totalRegistro = 0;
    }

    // AÇÕES DA TABLE
    alterar(id: any) {
        const urlSplit: string[] = this.router.routerState.snapshot.url.split('/');
        const urlBase: string = urlSplit[1] + '/alterar/' + id;
        this.router.navigate([urlBase]);
    }

    visualizar(id: any) {
        const urlSplit: string[] = this.router.routerState.snapshot.url.split('/');
        const urlBase: string = urlSplit[1] + '/visualizar/' + id;
        this.router.navigate([urlBase]);
    }

    deletar(resource: T) {
        this.resourceService.delete(resource.id)
            .subscribe(() => {
                this.searchWithMessage = false;
                this.actionsForSuccess();
                this.pesquisa();
        });
    }

    actionsForSuccess() {
        this.messageService.add(
            {
                severity: 'success',
                summary: 'Menssagem',
                detail: 'Ação realizada com sucesso!'
            }
        );
    }

}

