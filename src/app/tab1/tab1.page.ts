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
  // NOVAS IMPORTAÇÕES PARA INFINITE SCROLL
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';

import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    // ADICIONE ESTES AO ARRAY DE IMPORTS
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ]
})
export class Tab1Page implements OnInit {
  pokemons: any[] = [];
  offset: number = 0;
  limit: number = 20; // Quantidade de Pokémons a carregar por vez
  maxPokemons: number = 1000; // Um limite arbitrário para a PokeAPI (ela tem mais de 1000)

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    console.log('Tab1Page: ngOnInit chamado. Iniciando carregamento de Pokémons.');
    this.loadPokemons();
  }

  loadPokemons(event?: any) { // 'event' é opcional para a chamada inicial
    if (this.pokemons.length >= this.maxPokemons) {
      if (event) {
        event.target.complete(); // Indica que não há mais dados
      }
      return;
    }

    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      next: (data) => {
        console.log('Tab1Page: Dados brutos da API recebidos:', data);
        const newPokemons = data.map((pokemon: any) => {
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2];
          pokemon.id = id;
          pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return pokemon;
        });
        this.pokemons = [...this.pokemons, ...newPokemons];
        console.log('Tab1Page: Pokémons processados e prontos para exibição:', this.pokemons);

        this.offset += this.limit; // Aumenta o offset para a próxima requisição

        if (event) {
          event.target.complete(); // Indica ao infinite scroll que o carregamento terminou
          if (this.pokemons.length >= this.maxPokemons) {
            event.target.disabled = true; // Desabilita o infinite scroll se atingir o limite
          }
        }
      },
      error: (err) => {
        console.error('Tab1Page: Erro ao carregar Pokémons:', err);
        if (event) {
          event.target.complete(); // Em caso de erro, também finaliza o carregamento
        }
      }
    });
  }

  // NOVO MÉTODO: Chamado pelo ion-infinite-scroll
  loadMoreData(event: any) {
    this.loadPokemons(event);
  }
}