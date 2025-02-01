import { Component, } from '@angular/core';
import { RouterLink, RouterOutlet,  } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  ],
  template: `
    <router-outlet></router-outlet> <!-- Punto de entrada para las rutas -->
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GI2T';
}