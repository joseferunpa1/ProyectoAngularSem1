import { Component,OnInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { Router } from '@angular/router';
import { NgIf,NgFor } from '@angular/common';
@Component({
  selector: 'app-encuestas',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './encuestas.component.html',
  styleUrl: './encuestas.component.scss'
})
export class EncuestasComponent implements OnInit {

  encuestas: any[] = [];


  constructor(private action: ActionsService, private ruta: Router) { }

  ngOnInit(): void {
    this.encuestas = this.action.getEncuestas();
  }

  iniciar(id: string): void {
    this.ruta.navigate(['/encuesta', id]);
  }
  

  ingresar(){
    this.ruta.navigate(['/dashboard/list']);

  }

}