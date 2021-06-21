import { Injector } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { BaseResourceModel } from './base-resource.model';
import { BaseFiltroModel } from './base-filtro.model';

const API_URL = environment.api.url;

export abstract class BaseResourceService<T extends BaseResourceModel> {

    protected apiUrl: string;
    protected http: HttpClient;

    protected constructor(
        protected apiPath: string,
        protected injector: Injector,
        protected jsonDataToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient);
        this.apiUrl = API_URL;
    }

    getPageable(params: HttpParams): Observable<any> {
        return this.http.get(`${API_URL}/${this.apiPath}/paginado`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    getAll(): Observable<T[]> {
        return this.http.get(`${API_URL}/${this.apiPath}`).pipe(
            map(this.jsonDataToResources.bind(this))
        );
    }

    getById(id: number): Observable<T> {
        const url = `${API_URL}/${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleError)
        );
    }

    create(resource: T): Observable<T> {
        return this.http.post(`${API_URL}/${this.apiPath}`, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        );
    }

    update(resource: T): Observable<T> {
        const url = `${API_URL}/${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        );
    }

    delete(id: any): Observable<any> {
        const url = `${API_URL}/${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleError)
        );
    }

    // PROTECTED METHODS
    protected jsonDataToResources(jsonData: any): T[] {
        const resources: T[] = [];
        if (jsonData.content) {
            jsonData.content.forEach(
                element => resources.push(this.jsonDataToResourceFn(element))
            );
        } else {
            jsonData.forEach(
                element => resources.push(this.jsonDataToResourceFn(element))
            );
        }
        return resources;
    }

    protected jsonDataToResource(jsonData: any): T {
        return this.jsonDataToResourceFn(jsonData);
    }

    protected handleError(error: any): Observable<any> {
        console.log('ERRO NA REQUISIÇÃO => ', error);
        return throwError(error);
    }

    searchPageable(parametros: BaseFiltroModel, params: HttpParams) {
        if (parametros) {
            Object.entries(parametros).forEach(([key, value]) => {
                if (value instanceof Array) {
                    if (value.length > 0) {
                        params = params.append(key, value.toString());
                    }
                } else {
                    if (value != null) {
                        params = params.append(key, value.toString());
                    }
                }
            });
        }
        return this.http.get(`${API_URL}/${this.apiPath}`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    getApiPath() {
        return this.apiPath;
    }

    createParamsByFiltro(parametros: BaseFiltroModel): HttpParams {
        let params = new HttpParams();

        if (parametros) {
            Object.entries(parametros).forEach(([key, value]) => {
                if (value instanceof Array) {
                    if (value.length > 0) {
                        params = params.append(key, value.toString());
                    }
                } else {
                    if (value != null) {
                        params = params.append(key, value.toString());
                    }
                }
            });
        }
        return params;
    }

}
