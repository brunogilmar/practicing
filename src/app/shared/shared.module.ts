import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgSelectModule } from '@ng-select/ng-select';

import { ButtonActionsPesquisaComponent } from './button-group/button-actions-pesquisa/button-actions-pesquisa.component';
import { ButtonActionsCadastroComponent } from './button-group/button-actions-cadastro/button-actions-cadastro.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { MascaraCep } from './util/pipe/mascara-cep.pipe';
import { MascaraCpf } from './util/pipe/mascara-cpf.pipe';
import { ButtonActionsTableComponent } from './button-group/button-actions-table/button-actions-table.component';
import { MascaraAtivoInativo } from './util/pipe/ativoInativo.pipe';
import { MascaraTelefone } from './util/pipe/mascara-telefone.pipe';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        TooltipModule,
        NgSelectModule,
        ConfirmDialogModule,
    ],
    declarations: [
        ButtonActionsPesquisaComponent,
        ButtonActionsCadastroComponent,
        ButtonActionsTableComponent,
        MessageFormComponent,
        MascaraAtivoInativo,
        MascaraCpf,
        MascaraCep,
        MascaraTelefone,
    ],
    exports: [
        ButtonActionsPesquisaComponent,
        ButtonActionsCadastroComponent,
        ButtonActionsTableComponent,
        MessageFormComponent,
        MascaraAtivoInativo,
        MascaraCpf,
        MascaraCep,
        MascaraTelefone,
    ]
})
export class SharedModule { }
