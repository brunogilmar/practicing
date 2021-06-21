import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoginService } from '../../login/login.service';
import { JwtService } from '../../seguranca/jwt.service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

    public environment = environment;
    public sidebarMinimized = false;

    constructor(
        private loginService: LoginService,
        private jwtService: JwtService
    ) { }

    ngOnInit() {
        (async () => {
            await new Promise(
                (resolve) =>
                    setTimeout(resolve,
                        this.jwtService.authenticateExpired()
                    )
            );
            this.fazerLogout();
        })();
    }

    toggleMinimize(e) {
        this.sidebarMinimized = e;
    }

    fazerLogout() {
        this.loginService.logout();
    }

}
