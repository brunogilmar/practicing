import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mascaraTelefone'})
export class MascaraTelefone implements PipeTransform {
    transform(value) {
        return value.replace(/(\d{2})(\d{4})(\d{4})/g, '(\$1) \$2-\$3');
    }

}
