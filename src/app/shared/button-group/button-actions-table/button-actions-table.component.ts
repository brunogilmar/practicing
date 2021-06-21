import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AutorizacaoService } from '../../../core/seguranca/autorizacao.service';

@Component({
    selector: 'app-sgc-button-actions-table',
    templateUrl: './button-actions-table.component.html'
})
export class ButtonActionsTableComponent implements OnInit {

    @Output() buttonToViewForm = new EventEmitter();
    @Output() buttonChangeForm = new EventEmitter();
    @Output() buttonDeleteForm = new EventEmitter();

    constructor(
        private auth: AutorizacaoService
    ) { }

    ngOnInit(): void {
    }

    visualizarRegistro() {
        this.buttonToViewForm.emit();
    }

    alterarRegistro() {
        this.buttonChangeForm.emit();
    }

    deletarRegistro() {
        this.buttonDeleteForm.emit();
    }

    verificaPermissao(acao: string): boolean {
        return this.auth.getPermissoes(acao);
    }

}
