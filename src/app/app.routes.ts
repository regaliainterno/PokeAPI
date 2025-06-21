import { Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page'; // <-- Importe a Tab1Page

export const routes: Routes = [
  {
    path: '', // A rota raiz será a Tab1Page
    loadComponent: () => import('./tab1/tab1.page').then(m => m.Tab1Page),
  },
  {
    path: 'pokemon-details/:id', // A rota de detalhes permanece igual
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.page').then((m) => m.PokemonDetailsPage),
  },
  // Opcional: Adicionar um fallback para rotas não encontradas
  {
    path: '**', // Coringa para qualquer outra rota não definida
    redirectTo: '', // Redireciona para a raiz (Tab1Page)
    pathMatch: 'full'
  }
];