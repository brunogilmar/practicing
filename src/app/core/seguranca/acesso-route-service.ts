import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { StorageService } from './storage.service';
import { AutorizacaoService } from './autorizacao.service';

@Injectable({
    providedIn: 'root'
})
export class AcessoRouteService implements CanActivate {

    constructor(
        private router: Router,
        private autorizacaoService: AutorizacaoService,
        private storageService: StorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        const authorities = route.data['authorities'];
        return this.checkLogin(authorities, state.url);
    }

    checkLogin(authorities: string[], url: string): Promise<boolean> {
        return this.autorizacaoService.identity().then(objeto => {
            if (objeto != null) {
                return this.autorizacaoService.hasAnyAuthority(authorities).then(result => {
                    if (!authorities || authorities.length === 0) {
                        return true;
                    }
                    if (!result) {
                        this.storageService.storeUrl(url);
                        if (!result) {
                            this.router.navigate(['login']);
                        }
                    }
                    return result;
                });
            } else {
                this.storageService.storeUrl(url);
                this.router.navigate(['login'], { queryParams: { returnUrl: url } });
                return true;
            }

        });
    }
}
