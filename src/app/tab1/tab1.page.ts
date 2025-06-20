import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngFor
// Importe APENAS os componentes Ionic que serão usados diretamente no TEMPLATE HTML desta página
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
  IonRippleEffect // Para o efeito visual de clique no card
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router'; // Importe RouterLink para usar [routerLink] no HTML

import { PokemonService } from '../services/pokemon.service'; // Importe o serviço PokemonService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // Adicione RouterLink aqui
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
    IonRippleEffect // Adicione IonRippleEffect aqui
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
      console.log('Tab1Page: Limite máximo de Pokémons atingido.');
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

  loadMoreData(event: any) {
    this.loadPokemons(event);
  }
}