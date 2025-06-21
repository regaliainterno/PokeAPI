import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'; // <-- Remover outros imports Ion* se existirem

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet], // <-- Remover outros imports Ion* se existirem
})
export class AppComponent {
  constructor() {}
}