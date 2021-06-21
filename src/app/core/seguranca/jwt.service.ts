import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { environment } from './../../../environments/environment';
import { PrivilegiosDTO } from '../../shared/util/model/privilegiosDTO';
import { Login } from '../login/login.model';

@Injectable({
    providedIn: 'root'
})
export class JwtService {

    jwtHelper = new JwtHelperService();

    constructor(
        private http: HttpClient,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService
    ) {
    }

    getToken() {
        return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    }

    login(credentials: Login): Observable<any> {
        const data: Login = {
            email: credentials.email,
            senha: credentials.senha,
            rememberMe: true
        };

        return this.http.post(environment.api.url + '/autentica', data, { observe: 'response' })
            .pipe(map(authenticateSuccess.bind(this)));

        function authenticateSuccess(resp) {
            const token = resp.body.token;
            const bearer = resp.body.tipo;
            if (token && bearer === 'Bearer') {
                const jwt = token;

                const privilegios: PrivilegiosDTO = new PrivilegiosDTO();
                privilegios.jwt = jwt;

                this.storeAuthenticationToken(privilegios, credentials.rememberMe);

                return privilegios;
            }
        }
    }

    getPrivilegios(): PrivilegiosDTO {
        return (this.$localStorage.retrieve('privilegios') || this.$sessionStorage.retrieve('privilegios'));
    }

    storeAuthenticationToken(privilegios, rememberMe) {
        if (rememberMe) {
            this.$localStorage.store('authenticationToken', privilegios.jwt);
            this.$localStorage.store('privilegios', privilegios);
        } else {
            this.$sessionStorage.store('authenticationToken', privilegios.jwt);
            this.$sessionStorage.store('privilegios', privilegios);
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.clearTokenEPrivilegios();
            observer.complete();
        });
    }

    clearTokenEPrivilegios() {
        this.$localStorage.clear('authenticationToken');
        this.$sessionStorage.clear('authenticationToken');

        this.$localStorage.clear('privilegios');
        this.$sessionStorage.clear('privilegios');
    }

    authenticateExpired() {
        let tempoParaExpirar = 0; // 0 Min
        const tempoAntesDeExpirarToken = 300000; // 5 Min
        const validadeTokenExpirado = this.jwtHelper.isTokenExpired(this.getToken());
        const horaExpiraToken = this.jwtHelper.getTokenExpirationDate(this.getToken()).getTime();

        if (!validadeTokenExpirado) {
            const horaAtual = new Date().getTime();
            if (horaExpiraToken >= horaAtual) {

                tempoParaExpirar = horaExpiraToken - horaAtual;
                const timeDiferenca = tempoParaExpirar - tempoAntesDeExpirarToken;

                if (0 > timeDiferenca) {
                    tempoParaExpirar = tempoAntesDeExpirarToken;
                    //CRIAR UM MODAL PARA DIZER QUE ESTA ACABANDO
                }
            }
        } else {
            // Força novo login
            this.clearTokenEPrivilegios();
        }
        return tempoParaExpirar;
    }

}
