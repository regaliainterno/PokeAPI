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
  IonSpinner,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { FavoriteService } from '../services/favorite.service';
import { addIcons } from 'ionicons';
import { heartOutline, heartSharp } from 'ionicons/icons';

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
    IonSpinner,
    IonIcon,
    IonButton
  ],
})
export class PokemonDetailsPage implements OnInit {
  pokemonId: string | null = null;
  pokemonDetails: any = null;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private favoriteService: FavoriteService
  ) {
    addIcons({ heartOutline, heartSharp });
  }

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
        this.checkFavoriteStatus();
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do Pokémon:', err);
      }
    });
  }

  async checkFavoriteStatus() {
    if (this.pokemonDetails) {
      this.isFavorite = await this.favoriteService.isFavorite(this.pokemonDetails.id);
      console.log(`Detalhes: ${this.pokemonDetails.name} (ID: ${this.pokemonDetails.id}) é favorito? ${this.isFavorite}`);
    }
  }

  async toggleFavorite() {
    console.log(`Detalhes: Tentando alternar favorito para ${this.pokemonDetails.name}. Status atual: ${this.isFavorite}`);
    if (this.pokemonDetails) {
      if (this.isFavorite) {
        await this.favoriteService.removeFavorite(this.pokemonDetails.id);
        console.log(`Detalhes: Chamou removeFavorite para ID: ${this.pokemonDetails.id}`);
      } else {
        await this.favoriteService.addFavorite(this.pokemonDetails);
        console.log(`Detalhes: Chamou addFavorite para ID: ${this.pokemonDetails.id}`);
      }
      this.isFavorite = !this.isFavorite; // Inverte o estado na UI
      console.log(`Detalhes: Novo status favorito para ${this.pokemonDetails.name}: ${this.isFavorite}`);
    }
  }
}