import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // MUDANÇA TEMPORÁRIA: Usar a URL direta da API para testar
  // Por favor, DIGITE ESTA LINHA MANUALMENTE para garantir que não há caracteres ocultos:
  private readonly BASE_URL = 'https://pokeapi.co/api/v2'; 

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    // DIGITE ESTA LINHA MANUALMENTE, USANDO '+' PARA CONCATENAR:
    var requestUrl = this.BASE_URL + '/pokemon?offset=' + offset + '&limit=' + limit;
    console.log('DEBUG SERVICE: URL da requisição de lista (TESTE DIRETO):', requestUrl); // Novo log

    return this.http.get(requestUrl).pipe(
      map((response: any) => response.results)
    );
  }

  getPokemonDetails(nameOrId: string | number): Observable<any> {
    // DIGITE ESTA LINHA MANUALMENTE, USANDO '+' PARA CONCATENAR:
    var requestUrl = this.BASE_URL + '/pokemon/' + nameOrId;
    console.log('DEBUG SERVICE: URL da requisição de detalhes (TESTE DIRETO):', requestUrl); // Novo log

    return this.http.get(requestUrl);
  }
}