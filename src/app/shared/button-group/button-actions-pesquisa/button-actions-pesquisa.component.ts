import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacaoService } from '../../../core/seguranca/autorizacao.service';

@Component({
    selector: 'app-sgc-button-actions-pesquisa',
    templateUrl: './button-actions-pesquisa.component.html'
})
export class ButtonActionsPesquisaComponent implements OnInit {

    @Input() buttonNewCreate: string;
    @Output() buttonCleanForm = new EventEmitter();
    @Output() buttonSubmittedForm = new EventEmitter();

    constructor(
        private router: Router,
        private auth: AutorizacaoService
    ) { }

    ngOnInit(): void {
    }

    newCreate() {
        this.router.navigate([this.buttonNewCreate]);
    }

    cleanForm() {
        this.buttonCleanForm.emit();
    }

    submittedForm() {
        this.buttonSubmittedForm.emit();
    }

    verificaPermissao(acao: string): boolean {
        return this.auth.getPermissoes(acao);
    }

}
