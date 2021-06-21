import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mascaraAtivoInativo'})
export class MascaraAtivoInativo implements PipeTransform {
    transform(value) {
        return value ? 'Atvio' : 'Inativo';
    }

}
