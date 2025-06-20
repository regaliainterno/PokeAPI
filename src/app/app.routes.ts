import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // NOVA ROTA PARA DETALHES DO POKÉMON (iremos criar este componente a seguir)
  {
    path: 'pokemon-details/:id', // :id é um parâmetro de rota
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.page').then((m) => m.PokemonDetailsPage),
  },
  {
    path: 'pokemon-details',
    loadComponent: () => import('./pokemon-details/pokemon-details.page').then( m => m.PokemonDetailsPage)
  },
  {
    path: 'pokemon-details',
    loadComponent: () => import('./pokemon-details/pokemon-details.page').then( m => m.PokemonDetailsPage)
  },
];