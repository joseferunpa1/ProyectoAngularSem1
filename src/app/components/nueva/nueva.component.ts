import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActionsService } from '../../services/actions.service';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-nueva',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, ModalComponent],
  templateUrl: './nueva.component.html',
  styleUrl: './nueva.component.scss'
})
export class NuevaComponent implements OnInit {
  public formAnswers = new FormGroup({
    nameAnswer: new FormControl(null, Validators.required),
    preguntas: new FormArray([])
  });
  public preguntas = this.formAnswers.get('preguntas') as FormArray;
  public validated = false;
  public dateSave = false;
  private item: number = 0; // Inicializado a 0
  selectedItem: any;
  isModalVisible: boolean = false;

  // Referencia al contenedor de preguntas en el HTML
  @ViewChild('preguntasContainer', { static: false }) preguntasContainer!: ElementRef;

  constructor(public action: ActionsService) {
    action.dA.subscribe(action => {
      if (action === 'deleteItem') {
        this.delete();
      }
    });
  }

  ngOnInit(): void {
    this.preguntas = this.formAnswers.get('preguntas') as FormArray;
  }

  getPregunta(index: number): FormGroup {
    return this.preguntas.at(index) as FormGroup;
  }

  // Método para añadir una nueva pregunta
  newAnswer() {
    this.preguntas.push(new FormGroup({
      pregunta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required)
    }));

    // Desplazar la pantalla hacia abajo después de añadir la pregunta
    this.scrollToBottom();
  }

  // Método para desplazar el contenedor hacia abajo
// Método para desplazar la página hacia abajo
scrollToBottom() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight, // Desplaza al final de la página
      behavior: 'smooth' // Añade un efecto de desplazamiento suave
    });
  }, 100); // Pequeño retraso para asegurar que el DOM se actualice
}

  save() {
    if (!this.formAnswers.invalid) {
      const res = this.action.setStorage(this.formAnswers.value);
      if (res) {
        this.dateSave = true;
        this.formAnswers.reset();
        this.preguntas.clear();
        setTimeout(() => { this.dateSave = false; }, 5000);
      }
    } else {
      this.validated = true;
      setTimeout(() => { this.validated = false; }, 5000);
    }
  }

  openModal(item: number) {
    this.selectedItem = item;
    this.isModalVisible = true;
  }
  
  closeModal() {
    this.isModalVisible = false;
  }
  
  delete() {
    this.preguntas.removeAt(this.selectedItem);
    this.closeModal();
  }

  itemValue(i: any) {
    this.item = i;
  }

  autoExpand(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Resetea la altura
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta según el contenido
  }
}


