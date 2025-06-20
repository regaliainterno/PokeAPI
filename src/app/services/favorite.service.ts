import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap, map, filter } from 'rxjs/operators';

const FAVORITES_KEY = 'my_favorites';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _storage: Storage | null = null;
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$: Observable<any[]> = this.favoritesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Cria a instância do storage
    const storage = await this.storage.create();
    this._storage = storage;
    // Carrega os favoritos ao iniciar
    this.loadFavorites();
  }

  private async loadFavorites() {
    const favorites = await this._storage?.get(FAVORITES_KEY) || [];
    this.favoritesSubject.next(favorites);
  }

  getFavorites(): Observable<any[]> {
    // Retorna o BehaviorSubject diretamente para reatividade
    return this.favorites$;
  }

  async isFavorite(pokemonId: number): Promise<boolean> {
    const favorites = await this._storage?.get(FAVORITES_KEY) || [];
    return favorites.some((fav: any) => fav.id === pokemonId);
  }

  async addFavorite(pokemon: any) {
    let favorites = await this._storage?.get(FAVORITES_KEY) || [];
    const exists = favorites.some((fav: any) => fav.id === pokemon.id);

    if (!exists) {
      favorites = [...favorites, pokemon];
      await this._storage?.set(FAVORITES_KEY, favorites);
      this.favoritesSubject.next(favorites); // Notifica os subscribers
      console.log(`Adicionado aos favoritos: ${pokemon.name}`);
    }
  }

  async removeFavorite(pokemonId: number) {
    let favorites = await this._storage?.get(FAVORITES_KEY) || [];
    const updatedFavorites = favorites.filter((fav: any) => fav.id !== pokemonId);

    if (updatedFavorites.length !== favorites.length) { // Se realmente removeu
      await this._storage?.set(FAVORITES_KEY, updatedFavorites);
      this.favoritesSubject.next(updatedFavorites); // Notifica os subscribers
      console.log(`Removido dos favoritos: ${pokemonId}`);
    }
  }
}