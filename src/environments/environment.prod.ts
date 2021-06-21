
declare var require: any;

export const environment = {
    production: true,
    itensPorPagina: 10,
    api: {
        name: require( '../../package.json').name,
        description: require( '../../package.json').description,
        version: require( '../../package.json').version,
        dataUpdate: require( '../../package.json').dataUpdate,
        hourUpdate: require( '../../package.json').hourUpdate,
        author: require( '../../package.json').author,
        url: 'http://localhost:8089'
    }
};
