import { Component, Injector, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BaseResourceFormV2Component } from '../../../shared/abstract/base-resource-formv2.component';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { EnderecoComponent } from '../cliente-componentes/endereco/endereco.component';
import { Endereco } from '../cliente-componentes/endereco/endereco.model';
import { Telefone } from '../cliente-componentes/telefone/telefone.model';
import { Email } from '../cliente-componentes/email/email.model';
import { AcaoPageEnum } from '../../../shared/util/enum/acao-page.enum';
import { TelefoneComponent } from '../cliente-componentes/telefone/telefone.component';
import { EmailComponent } from '../cliente-componentes/email/email.component';

@Component({
    selector: 'app-sgc-cliente-cadastro',
    templateUrl: './cliente-cadastro.component.html'
})
export class ClienteCadastroComponent extends BaseResourceFormV2Component<Cliente> implements AfterViewInit {

    @ViewChild(EnderecoComponent, {static: false})
    enderecoComponent: EnderecoComponent;

    @ViewChild(TelefoneComponent, {static: false})
    telefoneComponent: TelefoneComponent;

    @ViewChild(EmailComponent, {static: false})
    emailComponent: EmailComponent;

    acaoPageCadastrar = AcaoPageEnum.CADASTRAR;
    dadosCliente: Cliente;
    nomeClienteInvalido = false;

    dsLabelForm = {
        nome: 'Nome',
        cpf: 'CPF',
        ativo: 'Situação',
        alteradoEm: 'Última alteração'
    };

    constructor(
        protected router: Router,
        protected injector: Injector,
        protected service: ClienteService,
    ) {
        super(injector, new Cliente(), service);
    }

    ngAfterViewInit() { }

    loadForm(cliente: Cliente) {
        this.formCadastro = new FormGroup({
            id: new FormControl(cliente?.id),
            nome: new FormControl(cliente?.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
            cpf: new FormControl(cliente?.cpf, [Validators.required]),
            endereco: new FormControl(cliente?.endereco, Validators.required),
            telefoneList: new FormControl(cliente?.telefoneList, Validators.required),
            emailList: new FormControl(cliente?.emailList, Validators.required),
        });
        if(cliente !== null) {
            setTimeout(() => {
                this.enderecoComponent.loadForm(cliente?.endereco, this.currentAction);
                this.telefoneComponent.loadTelefoneList(cliente?.telefoneList, this.currentAction);
                this.emailComponent.loadEmailList(cliente?.emailList, this.currentAction);
            }, 1000);
        }

    }

    setValueEndereco(endereco: Endereco) {
        this.formCadastro.get("endereco").setValue(endereco);
    }

    setValueTelefone(telefone: Telefone) {
        this.formCadastro.get("telefoneList").setValue(telefone);
    }

    setValueEmail(email: Email) {
        this.formCadastro.get("emailList").setValue(email);
    }
}
