import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs'; 
import { map, take } from 'rxjs/operators'; // <-- Adicione 'take' aqui

const FAVORITES_KEY = 'my_favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$: Observable<any[]> = this.favoritesSubject.asObservable();

  constructor() { 
    this.init();
  }

  async init() {
    try {
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);
      const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      this.favoritesSubject.next(favorites);
      console.log('FavoriteService: localStorage inicializado com sucesso.');
      console.log('FavoriteService: Favoritos carregados na inicialização:', favorites);
    } catch (error) {
      console.error('FavoriteService: ERRO ao inicializar localStorage!', error);
      this.favoritesSubject.next([]); // Emite array vazio em caso de falha
    }
  }

  getFavorites(): Observable<any[]> {
    // CORREÇÃO AQUI: Use take(1) para que o Observable complete após emitir o valor atual
    return this.favorites$.pipe(take(1)); 
  }

  async isFavorite(pokemonId: number): Promise<boolean> {
    try {
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);
      const favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      const result = favorites.some((fav: any) => fav.id === pokemonId);
      console.log(`FavoriteService: Verificando se ${pokemonId} é favorito: ${result}`);
      return result;
    } catch (error) {
      console.warn('FavoriteService: Erro ao verificar favorito no localStorage.', error);
      return false;
    }
  }

  async addFavorite(pokemon: any) {
    try {
      console.log(`FavoriteService: Tentando adicionar ${pokemon.name} (ID: ${pokemon.id}) aos favoritos.`);
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);
      let favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      const exists = favorites.some((fav: any) => fav.id === pokemon.id);

      if (!exists) {
        favorites = [...favorites, pokemon];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        this.favoritesSubject.next(favorites);
        console.log(`FavoriteService: Adicionado com sucesso: ${pokemon.name}. Nova lista:`, favorites);
      } else {
        console.log(`FavoriteService: ${pokemon.name} já é favorito.`);
      }
    } catch (error) {
      console.warn('FavoriteService: Erro ao adicionar favorito ao localStorage.', error);
    }
  }

  async removeFavorite(pokemonId: number) {
    try {
      console.log(`FavoriteService: Tentando remover favorito com ID: ${pokemonId}.`);
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);
      let favorites = favoritesJson ? JSON.parse(favoritesJson) : [];
      const initialLength = favorites.length;
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== pokemonId);

      if (updatedFavorites.length !== initialLength) { // Se realmente removeu algum item
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        this.favoritesSubject.next(updatedFavorites);
        console.log(`FavoriteService: Removido com sucesso ID: ${pokemonId}. Nova lista:`, updatedFavorites);
      } else {
        console.log(`FavoriteService: ID ${pokemonId} não encontrado nos favoritos ou lista já vazia.`);
      }
    } catch (error) {
      console.warn('FavoriteService: Erro ao remover favorito do localStorage.', error);
    }
  }
}