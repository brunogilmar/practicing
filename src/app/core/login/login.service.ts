import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AutorizacaoService } from '../seguranca/autorizacao.service';
import { JwtService } from '../seguranca/jwt.service';
import { Login } from './login.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private autorizacaoService: AutorizacaoService,
                private jwtService: JwtService,
                private router: Router) {}

    login(credentials: Login, callback?) {
        const cb = callback || function() {};

        return new Promise((resolve, reject) => {
            this.jwtService.login(credentials).subscribe(
                data => {
                    this.autorizacaoService.identity(true).then(account => {
                        resolve(data.jwt);
                    });
                    return cb();
                },
                err => {
                    this.logout();
                    reject(err);
                    return cb(err);
                }
            );
        });
    }

    logout() {
        this.jwtService.logout().subscribe();
        this.autorizacaoService.authenticate(null);
        this.router.navigate(['login']);
    }
}
