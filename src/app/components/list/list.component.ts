import { Component,OnInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { Router } from '@angular/router';
import { NgFor,NgIf } from '@angular/common';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  encuestas: any[] = [];

  constructor(private action: ActionsService, private ruta: Router) { }

  ngOnInit(): void {
    this.encuestas = this.action.getEncuestas();
  }

  edit(id: string): void{
    this.ruta.navigate(['/dashboard/edit', id]);
  }

  result(id: string): void{
    this.ruta.navigate(['/dashboard/result', id]);
  }

  deleted(id: string): void{
    this.action.deleted(id);
  }

}