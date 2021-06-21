import { BaseResourceModel } from '../../../../shared/abstract/base-resource.model';

export class Endereco extends BaseResourceModel {

    public id: number;
    public cep: string;
    public logradouro: string;
    public bairro: string;
    public localidade: string;
    public uf: string;
    public complemento: string;
    public ativo: boolean;

    static fromJson(jsonData: any): Endereco {
        return Object.assign(new Endereco(), jsonData);
    }
}
