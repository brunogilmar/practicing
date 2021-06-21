import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { Email } from './email.model';
import { AcaoPageEnum } from '../../../../shared/util/enum/acao-page.enum';

@Component({
    selector: 'app-sgc-email',
    templateUrl: './email.component.html',
    providers: [ConfirmationService]
})
export class EmailComponent implements OnInit {

    @Output() getEmail = new EventEmitter();
    @Input() submittingForm = false;

    isCollapsed = false;

    formEmail: FormGroup;
    submittingEmail = false;
    emailValido = true;

    email: Email;
    emailList: Email[] = [];
    selectedEmail = [];

    acaoPageVisualizar = AcaoPageEnum.VISUALIZAR;
    currentAction: string;

    dsLabelForm = {
        email: 'E-mail',
    };

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        this.loadForm();
    }

    loadForm() {
        this.submittingEmail = false;
        this.formEmail = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]),
        });
    }

    loadEmailList(emailList: Email[], currentAction: string) {
        this.currentAction = currentAction;
        emailList.forEach(telefone => {
            this.emailList.push(telefone);
        });
    }

    cadastra() {
        this.submittingEmail = true;
        if (this.formEmail.valid && this.emailValido) {
            this.emailList.push(this.formEmail.value);
            this.getEmail.emit(this.emailList);
            this.loadForm();
        }
    }

    delete(email: Email) {
        this.confirmationService.confirm({
            message: 'Deseja realmente excluir este e-mail ' + email + '?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.emailList = this.emailList.filter(c => c.email !== email.email);
                this.getEmail.emit(this.emailList);
                this.messageService.add({ severity: 'success', summary: 'E-mail Excluído', detail: email.email, life: 3000 });
            }
        });
    }

}
