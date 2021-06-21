import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SharedModule } from '../../../shared/shared.module';
import { EnderecoComponent } from './endereco/endereco.component';
import { TelefoneComponent } from './telefone/telefone.component';
import { EmailComponent } from './email/email.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        NgSelectModule,
        NgxMaskModule.forRoot(),
        CollapseModule.forRoot(),
        ConfirmDialogModule,
        DynamicDialogModule,
        SharedModule
    ],
    declarations: [
        EnderecoComponent,
        TelefoneComponent,
        EmailComponent
    ],
    exports: [
        EnderecoComponent,
        TelefoneComponent,
        EmailComponent
    ]
})
export class ClienteComponentesModule { }
