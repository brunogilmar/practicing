import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mascaraCep'})
export class MascaraCep implements PipeTransform {
    transform(value) {
        return value.replace(/(\d{5})(\d{6})(\d{4})(\d{2})/g, '\$1.\$2\/\$3\-$4');
    }

}
