export class PrivilegiosDTO {

    public perfil: string;
    public jwt: any;

    static fromJson(jsonData: any): PrivilegiosDTO {
        return Object.assign(new PrivilegiosDTO(), jsonData);
    }

    constructor(values: Object = {}) {
    }
}
