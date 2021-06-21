import { Injectable, Injector } from '@angular/core';

import { BaseResourceService } from '../../shared/abstract/base-resource.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Endereco } from '../cliente/cliente-componentes/endereco/endereco.model';

const API_URL = environment.api.url;

@Injectable({
    providedIn: 'root'
})
export class CepService extends BaseResourceService<Endereco> {

    constructor(
        protected injector: Injector
    ) {
        super('ceps', injector, Endereco.fromJson);
    }

    getByCep(cep: string): Observable<Endereco> {
        const url = `${API_URL}/${this.apiPath}/${cep}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

}
