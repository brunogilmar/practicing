import { BaseResourceModel } from '../../shared/abstract/base-resource.model';
import { EnderecoComponent } from './cliente-componentes/endereco/endereco.component';
import { Endereco } from './cliente-componentes/endereco/endereco.model';
import { Telefone } from './cliente-componentes/telefone/telefone.model';
import { Email } from './cliente-componentes/email/email.model';

export class Cliente extends BaseResourceModel {

    public id: string;
    public nome: string;
    public cpf: string;
    public ativo: boolean;
    public alteradoEm: Date;
    public endereco: Endereco;
    public telefoneList: Telefone[];
    public emailList: Email[];

    static fromJson(jsonData: any): Cliente {
        return Object.assign(new Cliente(), jsonData);
    }
}
