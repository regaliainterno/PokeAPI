import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRippleEffect,
  IonIcon
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { FavoriteService } from '../services/favorite.service';
import { addIcons } from 'ionicons';
import { heartOutline, heartSharp } from 'ionicons/icons';
import { tap, switchMap, map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonRippleEffect,
    IonIcon
  ]
})
export class Tab1Page implements OnInit {
  pokemons: any[] = []; // Esta é a lista exibida (filtrada)
  allLoadedPokemons: any[] = []; // <-- NOVO: Lista mestre de todos os Pokémons carregados
  favoritesList: any[] = []; 
  offset: number = 0;
  limit: number = 50;
  maxPokemons: number = 2000;

  constructor(
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {
    addIcons({ heartOutline, heartSharp });
  }

  ngOnInit() {
    console.log('Tab1Page: ngOnInit chamado. Iniciando carregamento de Pokémons.');
    this.loadPokemons();
    this.favoriteService.favorites$.subscribe((favorites: any[]) => {
      this.favoritesList = favorites; 
      this.updateFavoriteStatus(favorites); // Este método agora gerencia 'this.pokemons'
    });
  }

  loadPokemons(event?: any) {
    if (this.offset >= this.maxPokemons) { // Usar offset para verificar o limite total
      if (event) {
        event.target.complete();
      }
      console.log('Tab1Page: Limite máximo de Pokémons atingido.');
      return;
    }

    forkJoin([
      this.pokemonService.getPokemonList(this.offset, this.limit),
      this.favoriteService.getFavorites()
    ]).pipe(
      tap(([pokemonData, favorites]: [any[], any[]]) => {
        console.log('Tab1Page: Dados brutos da API recebidos (no forkJoin):', pokemonData);
        console.log('Tab1Page: Favoritos recebidos (no forkJoin):', favorites);
      }),
      map(([pokemonData, favorites]: [any[], any[]]) => {
        const newPokemons = pokemonData.map((pokemonRaw: any) => {
          console.log('DEBUG MAP: Processando item bruto:', pokemonRaw); 
          
          if (!pokemonRaw || !pokemonRaw.url) {
            console.warn('DEBUG MAP: Item bruto inválido, pulando:', pokemonRaw);
            return null;
          }

          const urlParts = pokemonRaw.url.split('/');
          const id = urlParts[urlParts.length - 2];
          
          const processedPokemon = {
            id: parseInt(id), 
            name: pokemonRaw.name,
            url: pokemonRaw.url,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            isFavorite: favorites ? favorites.some((fav: any) => fav.id === parseInt(id)) : false
          };
          
          console.log('DEBUG MAP: Item processado:', processedPokemon); 
          return processedPokemon;
        }).filter((pokemon: any) => pokemon !== null);

        return newPokemons;
      })
    ).subscribe({
      next: (processedPokemons: any[]) => {
        // Adiciona os NOVOS Pokémons à lista MESTRE
        this.allLoadedPokemons = [...this.allLoadedPokemons, ...processedPokemons];
        console.log('Tab1Page: Todos os Pokémons carregados (lista mestre):', this.allLoadedPokemons);

        this.offset += this.limit;

        // Chama updateFavoriteStatus para filtrar e exibir a lista 'pokemons'
        this.updateFavoriteStatus(this.favoritesList); 

        if (event) {
          event.target.complete();
          if (this.offset >= this.maxPokemons) { // Usar offset para verificar o limite total
            event.target.disabled = true;
          }
        }
      },
      error: (err) => {
        console.error('Tab1Page: ERRO NO SUBSCRIBE DO FORKJOIN:', err);
        if (event) {
          event.target.complete();
        }
      },
      complete: () => {
        console.log('Tab1Page: ForkJoin SUBSCRIBE COMPLETO.');
      }
    });
  }

  loadMoreData(event: any) {
    this.loadPokemons(event);
  }

  // MÉTODO updateFavoriteStatus AGORA FILTRA A LISTA MESTRE PARA CRIAR A LISTA EXIBIDA
  private updateFavoriteStatus(favorites: any[]) {
    // Primeiro, atualiza o status isFavorite de todos os Pokémons na lista MESTRE
    const updatedAllPokemons = this.allLoadedPokemons.map(pokemon => {
      pokemon.isFavorite = favorites.some((fav: any) => fav.id === parseInt(pokemon.id));
      return pokemon;
    });

    // Segundo, filtra a lista EXIBIDA para remover os que são favoritos
    this.pokemons = updatedAllPokemons.filter(pokemon => !pokemon.isFavorite);
    
    console.log('Tab1Page: Lista de Pokémons (exibida) após filtro de favoritos:', this.pokemons);
  }

  async toggleFavoriteFromList(pokemon: any, event: Event) {
    event.stopPropagation();
    console.log(`Tab1Page: Tentando alternar favorito para ${pokemon.name}. ID: ${pokemon.id}`);
    
    const currentIsFavoriteStatus = await this.favoriteService.isFavorite(pokemon.id);

    if (currentIsFavoriteStatus) {
      await this.favoriteService.removeFavorite(pokemon.id);
      console.log(`Tab1Page: Chamou removeFavorite para ID: ${pokemon.id}`);
    } else {
      await this.favoriteService.addFavorite(pokemon);
      console.log(`Tab1Page: Chamou addFavorite para ID: ${pokemon.id}`);
    }
    // A UI e as listas (favoritesList, pokemons) serão atualizadas automaticamente
    // via a subscription do favorites$ no ngOnInit, que chama updateFavoriteStatus.
  }
}