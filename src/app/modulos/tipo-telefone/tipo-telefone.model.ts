import { BaseResourceModel } from '../../shared/abstract/base-resource.model';

export class TipoTelefone extends BaseResourceModel {

    public id: string;
    public descricao: string;
    public ativo: boolean;

    static fromJson(jsonData: any): TipoTelefone {
        return Object.assign(new TipoTelefone(), jsonData);
    }
}
