import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {JwtService} from './jwt.service';
import {PrivilegiosDTO} from '../../shared/util/model/privilegiosDTO';

@Injectable({
    providedIn: 'root'
})
export class AutorizacaoService {

    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(private jwtService: JwtService) {
    }

    fetch(): Promise<any> {
        return Promise.resolve(this.objetoSession());
    }

    private objetoSession(): any {
        const token: string = this.jwtService.getToken();
        if (token === undefined || token == null) {
            return null;
        } else {
            const retorno: string = atob(token.split('.')[1]);
            const objeto = JSON.parse(retorno);
             const privilegios: PrivilegiosDTO = this.jwtService.getPrivilegios();
             if (privilegios) {
            //     objeto.menu = ConvertUtil.listaMenuItemNavToListaMenuItem(privilegios.menu);
            //     objeto.acoes = privilegios.acoes;
             }
            return objeto;
        }
    }

    getUsuarioLogado(): string {
        return this.objetoSession() !== null ? this.objetoSession().usuario as string : '';
    }

    getNomeUsuarioLogado(): string {
        return this.objetoSession() !== null ? this.objetoSession().nome as string : '';
    }

    getRole(): string {
        return this.objetoSession() !== null ? this.objetoSession().roles as string : '';
    }

    getPermissoes(acao): boolean {
        switch(acao) {
            case 'CADASTRAR_CLIENTE':
                return this.getRole() === 'ROLE_ADMIN';
            case 'PESQUISAR_CLIENTE':
                return this.getRole() === 'ROLE_ADMIN' || this.getRole() === 'ROLE_COMUM';
            case 'ALTERAR_CLIENTE':
                return this.getRole() === 'ROLE_ADMIN';
            case 'DELETAR_CLIENTE':
                return this.getRole() === 'ROLE_ADMIN';
            case 'VISUALIZAR_CLIENTE':
                return this.getRole() === 'ROLE_ADMIN' || this.getRole() === 'ROLE_COMUM';
            default:
                return false;
        }
    }




    authenticate(identity) {
        debugger
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return this.verifyPermission(authorities, this.userIdentity.roles);
    }

    verifyPermission(authorities: string[], permissions: any): Promise<boolean> {
        let isPermission = authorities.filter((auth) => auth === permissions).length > 0;
        return Promise.resolve(isPermission);
    }

    identity(force?: boolean): Promise<any> {
        return this.fetch()
            .then(response => {
                const objeto = response;
                if (objeto) {
                    this.userIdentity = objeto;
                    this.authenticated = true;
                } else {
                    this.userIdentity = null;
                    this.authenticated = false;
                }
                this.authenticationState.next(this.userIdentity);
                return this.userIdentity;
            })
            .catch(err => {
                this.userIdentity = null;
                this.authenticated = false;
                this.authenticationState.next(this.userIdentity);
                return null;
            });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

}
