export class Filtro {

    parametros: ParametroPesquisa[] = [];

    constructor(parametros: ParametroPesquisa[]) {
        this.parametros = parametros;
    }
}

export class ParametroPesquisa {
    chave?: string;
    valor?: any;

    constructor(chave: string, valor: any) {
        this.chave = chave;
        this.valor = valor;
    }
}
