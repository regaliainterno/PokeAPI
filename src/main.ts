import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
// REMOVA: import { provideStorage } from '@ionic/storage-angular'; // Esta linha não é mais necessária
import { Storage } from '@ionic/storage-angular'; // <-- NOVO: Importe a CLASSE Storage

import { routes } from './app/app.routes';
import { environment } from './environments/environment'; 
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    // Substituindo provideStorage() por esta configuração
    {
      provide: Storage, // O token de injeção é a classe Storage
      useFactory: () => { // Uma função de fábrica para criar a instância de Storage
        const storage = new Storage({
          name: '_ionicstorage', // Nome do banco de dados IndexedDB/localStorage
          driverOrder: ['indexeddb', 'sqlite', 'localstorage'] // Ordem dos drivers a serem tentados
        });
        // Chamar .create() é crucial para inicializar o storage
        storage.create(); 
        return storage; // Retorna a instância inicializada do Storage
      }
      // Sem 'deps' aqui, pois não precisamos injetar nada diretamente nesta fábrica simples
    }
  ]
});