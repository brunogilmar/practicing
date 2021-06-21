import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-sgc-message-form',
    templateUrl: './message-form.component.html'
})
export class MessageFormComponent implements OnInit {

    @Input() label: boolean;
    @Input() control: FormControl;
    @Input() submittingForm: boolean;
    @Input() validaNome: boolean;

    required = false;
    minlength = false;
    maxlength = false;
    email = false;
    requiredLength = 0;
    nomeInvalido = false;

    constructor() { }

    ngOnInit() {
        this.verificaErro();
    }

    verificaErro(): boolean {
        this.initConditionErrors();

        if (this.control.errors?.required && (this.control.dirty || this.submittingForm)) {
            this.required = true;
        } else if (this.control.errors?.minlength) {
            this.requiredLength = this.control.errors?.minlength.requiredLength;
            this.minlength = true;
        } else if (this.control.errors?.maxlength) {
            this.requiredLength = this.control.errors?.maxlength.requiredLength;
            this.maxlength = true;
        } else if (this.control.errors?.email && (this.control.dirty || this.submittingForm)) {
            this.email = true;
        }if (this.validaNome && (this.control.dirty || this.submittingForm)) {
            const expressao  = (/[^a-zA-Z à-úÀ-Ú 0-9]+/g);
            this.nomeInvalido = expressao.test(this.control.value);
        }
        return true;
    }

    initConditionErrors() {
        this.required = false;
        this.minlength = false;
        this.maxlength = false;
        this.email = false;
    }
}
