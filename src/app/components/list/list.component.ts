import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgIf, ModalComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  encuestas: any[] = [];
  modalMessage: string = '';
  isModalVisible: boolean = false; // Estado del modal
  selectedEncuestaId: string | null = null; // ID de la encuesta a eliminar

  constructor(private action: ActionsService, private ruta: Router) { }

  ngOnInit(): void {
    this.encuestas = this.action.getEncuestas();
  }

  edit(id: string): void {
    this.ruta.navigate(['/dashboard/edit', id]);
  }

  result(id: string): void {
    this.ruta.navigate(['/dashboard/result', id]);
  }

  // Método para abrir el modal antes de eliminar
  openDeleteModal(id: string): void {
    this.selectedEncuestaId = id;
    this.modalMessage = `¿Estás seguro de que deseas eliminar la encuesta?`;
    this.isModalVisible = true;
  }

  // Método que se llama al confirmar la eliminación desde el modal
  confirmDelete(): void {
    if (this.selectedEncuestaId) {
      this.action.deleted(this.selectedEncuestaId);
      this.encuestas = this.action.getEncuestas(); // Actualizar lista
    }
    this.closeModal();
  }

  // Cerrar modal
  closeModal(): void {
    this.isModalVisible = false;
    this.selectedEncuestaId = null;
  }
}
