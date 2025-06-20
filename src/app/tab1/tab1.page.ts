import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como *ngFor (ex: ngFor, ngIf)
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
  IonCardTitle
} from '@ionic/angular/standalone';

import { PokemonService } from '../services/pokemon.service'; // Importe o serviço PokemonService

@Component({
  selector: 'app-tab1', // O seletor HTML para este componente
  templateUrl: 'tab1.page.html', // O arquivo HTML associado
  styleUrls: ['tab1.page.scss'], // O arquivo de estilos SCSS associado
  standalone: true, // Indica que este é um componente standalone do Angular
  imports: [ // Módulos e Componentes que este componente standalone precisa para funcionar
    CommonModule, // Para diretivas Angular como *ngFor
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
    IonCardTitle
  ]
})
export class Tab1Page implements OnInit {
  pokemons: any[] = []; // Array para armazenar os dados dos Pokémons
  offset: number = 0;   // Usado para a paginação: quantos itens pular
  limit: number = 20;   // Usado para a paginação: quantos itens buscar por vez

  // Injeção de dependência: o Angular injetará uma instância de PokemonService aqui
  constructor(private pokemonService: PokemonService) {}

  // ngOnInit é um hook de ciclo de vida do Angular, chamado uma vez após a inicialização do componente
  ngOnInit() {
    console.log('Tab1Page: ngOnInit chamado. Iniciando carregamento de Pokémons.'); // Log para depuração
    this.loadPokemons(); // Chama o método para carregar os Pokémons
  }

  // Método para carregar Pokémons da API
  loadPokemons() {
    // Chama o método getPokemonList do PokemonService
    this.pokemonService.getPokemonList(this.offset, this.limit).subscribe({
      // Função 'next' é chamada quando a API retorna dados com sucesso
      next: (data) => {
        console.log('Tab1Page: Dados brutos da API recebidos:', data); // Log para depuração
        // Mapeia os dados recebidos para adicionar 'id' e 'imageUrl' a cada Pokémon
        const newPokemons = data.map((pokemon: any) => {
          // Extrai o ID do Pokémon da URL de detalhes (ex: "https://pokeapi.co/api/v2/pokemon/1/")
          const urlParts = pokemon.url.split('/');
          const id = urlParts[urlParts.length - 2]; // O ID é sempre o penúltimo segmento da URL

          pokemon.id = id; // Adiciona a propriedade 'id' ao objeto Pokémon
          // Constrói a URL da imagem usando o ID do Pokémon
          pokemon.imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return pokemon; // Retorna o objeto Pokémon modificado
        });
        // Adiciona os novos Pokémons à lista existente, mantendo os anteriores (para paginação futura)
        this.pokemons = [...this.pokemons, ...newPokemons];
        console.log('Tab1Page: Pokémons processados e prontos para exibição:', this.pokemons); // Log final para depuração
      },
      // Função 'error' é chamada se houver um erro na requisição da API
      error: (err) => {
        console.error('Tab1Page: Erro ao carregar Pokémons:', err); // Loga o erro no console
      }
    });
  }
}