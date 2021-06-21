export class Sort {
    coluna: string;
    direction = 'ASC';

    constructor(coluna: string, direction: number) {
        this.coluna = coluna;
        this.direction = direction > 0 ? 'ASC' : 'DESC';
    }

    toString(): string {
        return `${this.coluna},${this.direction}`;
    }

}
