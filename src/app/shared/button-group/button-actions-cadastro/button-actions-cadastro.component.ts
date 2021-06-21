import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AutorizacaoService } from '../../../core/seguranca/autorizacao.service';
import { AcaoPageEnum } from '../../util/enum/acao-page.enum';

@Component({
    selector: 'app-sgc-button-actions-cadastro',
    templateUrl: './button-actions-cadastro.component.html'
})
export class ButtonActionsCadastroComponent implements OnInit {

    @Output() buttonBackForm = new EventEmitter();
    @Output() buttonCleanForm = new EventEmitter();
    @Output() buttonSubmittedForm = new EventEmitter();
    @Input() currentAction : string;

    acaoPageCadastrar = AcaoPageEnum.CADASTRAR;
    acaoPageVisualizar = AcaoPageEnum.VISUALIZAR;

    constructor(
        private auth: AutorizacaoService
    ) { }

    ngOnInit(): void {
    }

    voltaForm() {
        this.buttonBackForm.emit();
    }

    limpaForm() {
        this.buttonCleanForm.emit();
    }

    enviaForm() {
        this.buttonSubmittedForm.emit();
    }

    verificaPermissao(acao: string): boolean {
        return this.auth.getPermissoes(acao);
    }

}
