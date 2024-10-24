import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLink],
  template: `
    <router-outlet></router-outlet> <!-- Punto de entrada para las rutas -->
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GI2T';
}

