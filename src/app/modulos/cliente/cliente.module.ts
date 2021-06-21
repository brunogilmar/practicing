import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

import { SharedModule } from '../../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponentesModule } from './cliente-componentes/cliente-componentes.module';
import { MessageUtil } from '../../shared/util/message.util';
import { ToastModule } from 'primeng/toast';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlockUIModule.forRoot({
            message: MessageUtil.CARREGANDO_TELA
        }),
        TableModule,
        TooltipModule,
        ButtonModule,
        CurrencyMaskModule,
        ToastModule,
        NgSelectModule,
        NgxMaskModule.forRoot(),
        CollapseModule.forRoot(),
        SharedModule,
        ClienteRoutingModule,
        ClienteComponentesModule,
    ],
    declarations: [
        ClientePesquisaComponent,
        ClienteCadastroComponent,
    ],
})
export class ClienteModule { }
