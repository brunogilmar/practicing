import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from './login.service';
import { AutorizacaoService } from '../seguranca/autorizacao.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submittingForm: Boolean = false;

    environment = environment;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private autorizacaoService: AutorizacaoService
    ) { }

    ngOnInit() {
        this.criarForm();
    }

    private criarForm() {
        this.loginForm = this.formBuilder.group({
            email: ['admin', Validators.required],
            senha: ['123456', Validators.required]
        });
    }

    logar() {
        this.submittingForm = true;
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value).then(retorno => {
                if (this.autorizacaoService.isAuthenticated) {
                    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
                    this.router.navigateByUrl(returnUrl ? returnUrl : 'clientes');
                }
            });
        }
    }

}
