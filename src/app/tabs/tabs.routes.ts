import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page'; // Importa o componente da página de abas

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage, // Componente pai das abas
    children: [ // Rotas filhas para cada aba
      {
        path: 'tab1',
        loadComponent: () => // lazy loading para o componente standalone Tab1Page
          import('../tab1/tab1.page').then(m => m.Tab1Page), // <-- CORRIGIDO AQUI
      },
      {
        path: 'tab2',
        loadComponent: () => // lazy loading para o componente standalone Tab2Page
          import('../tab2/tab2.page').then(m => m.Tab2Page), // <-- CORRIGIDO AQUI
      },
      {
        path: 'tab3',
        loadComponent: () => // lazy loading para o componente standalone Tab3Page
          import('../tab3/tab3.page').then(m => m.Tab3Page), // <-- CORRIGIDO AQUI
      },
      {
        path: '', // Redireciona a rota pai das abas para a tab1 por padrão
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '', // Redireciona a rota raiz para a tab1 por padrão
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];