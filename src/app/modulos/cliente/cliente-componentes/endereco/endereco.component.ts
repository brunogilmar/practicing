import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CepService } from '../../../cep/cep.service';
import { Endereco } from './endereco.model';
import { AcaoPageEnum } from '../../../../shared/util/enum/acao-page.enum';

@Component({
    selector: 'app-sgc-endereco',
    templateUrl: './endereco.component.html'
})
export class EnderecoComponent implements OnInit {

    @Input() submittingForm: boolean = false;
    @Output() setValueForm = new EventEmitter();

    isCollapsed = false;

    formEndereco: FormGroup;
    submittingCep = false;
    disableCampos = false;

    dsLabelForm = {
        cep: 'CEP',
        logradouro: 'Logradouro',
        bairro: 'Bairro',
        complemento: 'Complemento',
        localidade: 'Cidade',
        uf: 'UF',
    };

    constructor(
        private cepService: CepService
    ) {
    }

    ngOnInit() {
        this.loadForm(null, null);
    }

    loadForm(endereco: Endereco | null, currentAction: string | null): void {
        this.formEndereco = new FormGroup({
            cep: new FormControl(endereco?.cep, Validators.required),
            logradouro: new FormControl(endereco?.logradouro, [Validators.required, Validators.maxLength(100)]),
            bairro: new FormControl(endereco?.bairro, [Validators.required, Validators.maxLength(100)]),
            complemento: new FormControl(endereco?.complemento, [Validators.maxLength(100)]),
            localidade: new FormControl(endereco?.localidade, [Validators.required, Validators.maxLength(100)]),
            uf: new FormControl(endereco?.uf, [Validators.required, Validators.maxLength(2)]),
        });

        if(currentAction === AcaoPageEnum.VISUALIZAR) {
            this.disableCampos = true;
        }
    }

    adiciona() {
        this.submittingForm = true;
        if (this.formEndereco.valid) {
            this.setValueForm.emit(this.formEndereco.value);
        }
    }

    getCep() {
        this.submittingCep = true;
        if(this.formEndereco.get('cep').valid) {
            const value = this.formEndereco.get('cep').value;
            this.cepService.getByCep(value).subscribe((endereco: Endereco) => {
                this.loadForm(endereco, null);
                this.setValorInput();
            });
        }
    }

    setValorInput() {
        this.setValueForm.emit(this.formEndereco.value);
    }

}
