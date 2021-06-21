
export class Email {

    public id: number;
    public email: string;
    public ativo: boolean;

    static fromJson(jsonData: any): Email {
        return Object.assign(new Email(), jsonData);
    }
}
