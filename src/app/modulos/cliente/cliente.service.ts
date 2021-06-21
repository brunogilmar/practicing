import { Injectable, Injector } from '@angular/core';

import { Cliente } from './cliente.model';
import { BaseResourceService } from '../../shared/abstract/base-resource.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseResourceService<Cliente> {

    constructor(
        protected injector: Injector
    ) {
        super('clientes', injector, Cliente.fromJson);
    }

}
