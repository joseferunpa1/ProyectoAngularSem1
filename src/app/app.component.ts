import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HomeComponent } from './home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLink],
  //templateUrl: './app.component.html',
  template: `
    <router-outlet></router-outlet> <!-- Punto de entrada para las rutas -->
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Act1';
}

