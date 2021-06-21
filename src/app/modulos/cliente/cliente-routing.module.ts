import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePesquisaComponent } from './cliente-pesquisa/cliente-pesquisa.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Cliente'
        },
        children: [
            {
                path: '',
                redirectTo: 'pesquisa'
            },
            {
                path: 'pesquisa',
                component: ClientePesquisaComponent,
                data: {
                    title: 'Pesquisa'
                }
            },
            {
                path: 'cadastrar',
                component: ClienteCadastroComponent,
                data: {
                    title: 'Cadastrar'
                }
            },
            {
                path: 'alterar/:id',
                component: ClienteCadastroComponent,
                data: {
                    title: 'Alterar'
                }
            },
            {
                path: 'visualizar/:id',
                component: ClienteCadastroComponent,
                data: {
                    title: 'Visualizar'
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClienteRoutingModule { }
