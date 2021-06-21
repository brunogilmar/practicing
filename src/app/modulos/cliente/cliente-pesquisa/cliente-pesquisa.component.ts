import { Component, Injector, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { BaseResourceListV2Component } from '../../../shared/abstract/base-resource-listv2.component';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Sort } from '../../../shared/util/model/sort';
import { environment } from '../../../../environments/environment';
import { AutorizacaoService } from '../../../core/seguranca/autorizacao.service';

@Component({
    selector: 'app-sgc-cliente-pesquisa',
    templateUrl: './cliente-pesquisa.component.html'
})
export class ClientePesquisaComponent extends BaseResourceListV2Component<Cliente> {

    resourcePacht = 'clientes/cadastrar';

    totalRegistro = 0;
    readonly ITENS_POR_PAGINA = environment.itensPorPagina;

    constructor(
        injector: Injector,
        service: ClienteService,
    ) {
        super(injector, service);
        this.criaForm();
    }

    onLoadList() {
        this.coluna = 'nome';
        this.direction = 0;
        this.sort = new Sort(this.coluna, this.direction);
    }

    criaForm() {
        this.formFiltro = new FormGroup({
            nome: new FormControl(null),
            cpf: new FormControl(null)
        });
    }

}
