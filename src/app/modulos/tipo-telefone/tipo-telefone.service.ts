import { Injectable, Injector } from '@angular/core';

import { TipoTelefone } from './tipo-telefone.model';
import { BaseResourceService } from '../../shared/abstract/base-resource.service';

@Injectable({
    providedIn: 'root'
})
export class TipoTelefoneService extends BaseResourceService<TipoTelefone> {

    constructor(
        protected injector: Injector
    ) {
        super('telefones/tipos', injector, TipoTelefone.fromJson);
    }

}
