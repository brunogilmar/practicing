
export class Telefone {

    public id: number;
    public tipo: string;
    public telefone: string;
    public ativo: boolean;

    static fromJson(jsonData: any): Telefone {
        return Object.assign(new Telefone(), jsonData);
    }
}
