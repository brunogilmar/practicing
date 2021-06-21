import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { Telefone } from './telefone.model';
import { TipoTelefoneService } from '../../../tipo-telefone/tipo-telefone.service';
import { TipoTelefone } from '../../../tipo-telefone/tipo-telefone.model';
import { TipoTelefoneEnum } from '../../../../shared/util/enum/tipo-telefone.enum';
import { Email } from '../email/email.model';
import { AcaoPageEnum } from '../../../../shared/util/enum/acao-page.enum';


@Component({
    selector: 'app-sgc-telefone',
    templateUrl: './telefone.component.html',
    providers: [ConfirmationService, DialogService]
})
export class TelefoneComponent implements OnInit {

    @Output() getTelefone = new EventEmitter();
    @Input() submittingForm = false;

    isCollapsed = false;

    formTelefone: FormGroup;
    submittingTelefone = false;

    mascaraTelefone = "(00) 0000-0000"

    tipoTelefoneList: TipoTelefone[];
    telefoneList: Telefone[] = [];

    acaoPageVisualizar = AcaoPageEnum.VISUALIZAR;
    currentAction: string;

    dsLabelForm = {
        tipo: 'Tipo',
        telefone: 'Número do Telefone'
    };

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private tipoTelefoneService: TipoTelefoneService
    ) { }

    ngOnInit(): void {
        this.loadForm();
        this.loadTipoTelefone();
    }

    loadForm() {
        this.submittingTelefone = false
        this.formTelefone = new FormGroup({
            tipo: new FormControl(null, Validators.required),
            telefone: new FormControl(null, Validators.required),
        });
    }

    loadTelefoneList(telefoneList: Telefone[], currentAction: string) {
        this.currentAction = currentAction;
        telefoneList.forEach(telefone => {
            this.telefoneList.push(telefone);
        });
    }

    loadTipoTelefone() {
        this.tipoTelefoneService.getAll().subscribe((tipoTelefoneList: TipoTelefone[]) => {
            this.tipoTelefoneList = tipoTelefoneList;
        });
    }

    carregaMascara() {
        const tipoSelecionado = this.formTelefone.get("tipo").value;
        const isComercial = tipoSelecionado.id === TipoTelefoneEnum.COMERCIAL;
        const isResidencial = tipoSelecionado.id === TipoTelefoneEnum.RESIDENCIAL;
        const isCelular = tipoSelecionado.id === TipoTelefoneEnum.CELULAR;

        if(isComercial || isResidencial) {
            this.mascaraTelefone = "(00) 0000-0000"
        } else if(isCelular) {
            this.mascaraTelefone = "(00) 00000-0000"
        }
    }

    cadastra() {
        this.submittingTelefone = true;
        if (this.formTelefone.valid) {
            this.telefoneList.push(this.formTelefone.value);
            this.getTelefone.emit(this.telefoneList);
            this.loadForm();
        }
    }

    delete(telefone: Telefone) {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este telefone  ' + telefone.telefone + '?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.telefoneList = this.telefoneList.filter(c => c.telefone !== telefone.telefone);
                this.getTelefone.emit(this.telefoneList);
                this.messageService.add({ severity: 'success', summary: 'Telefone Excluída', detail: telefone.telefone, life: 3000 });
            }
        });
    }

}
