import { Component } from '@angular/core';
import { RouterLink,RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common'; // Si usas directivas como *ngI

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sideBar: boolean = false;


}