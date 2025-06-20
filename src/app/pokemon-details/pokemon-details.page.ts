import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonChip,
  IonProgressBar,
  IonSpinner // <-- Adicione esta linha
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonThumbnail,
    IonImg,
    IonChip,
    IonProgressBar,
    IonSpinner // <-- Adicione esta linha ao array de imports
  ],
})
export class PokemonDetailsPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.pokemonId = this.route.snapshot.paramMap.get('id');
    if (this.pokemonId) {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    this.pokemonService.getPokemonDetails(this.pokemonId!).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
        console.log('Detalhes do Pokémon:', this.pokemonDetails);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do Pokémon:', err);
      }
    });
  }
}