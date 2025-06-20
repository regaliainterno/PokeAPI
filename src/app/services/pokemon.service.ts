import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // REVERTENDO PARA A URL DIRETA DA API (funciona sem proxy)
  private readonly BASE_URL = 'https://pokeapi.co/api/v2'; 

  constructor(private http: HttpClient) { }

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    // A URL será construída diretamente com a base da API
    const requestUrl = this.BASE_URL + '/pokemon?offset=' + offset + '&limit=' + limit;
    console.log('DEBUG SERVICE: URL da requisição de lista (DIRETA API):', requestUrl);

    return this.http.get(requestUrl).pipe(
      map((response: any) => response.results)
    );
  }

  getPokemonDetails(nameOrId: string | number): Observable<any> {
    // A URL será construída diretamente com a base da API
    const requestUrl = this.BASE_URL + '/pokemon/' + nameOrId;
    console.log('DEBUG SERVICE: URL da requisição de detalhes (DIRETA API):', requestUrl);

    return this.http.get(requestUrl);
  }
}