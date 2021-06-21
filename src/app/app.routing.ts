import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './core/containers';

import { P404Component } from './core/error/404.component';
import { P500Component } from './core/error/500.component';
import { LoginComponent } from './core/login/login.component';
import { AcessoRouteService } from './core/seguranca/acesso-route-service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    children: [{
            path: 'clientes',
            canActivate: [AcessoRouteService],
            data: {
                authorities: ['ROLE_ADMIN', 'ROLE_COMUM']
              },
            loadChildren: () => import('./modulos/cliente/cliente.module').then(m => m.ClienteModule)
        },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
