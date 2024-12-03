import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,ReactiveFormsModule } from '@angular/forms';
import { ActionsService } from '../../services/actions.service';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
@Component({
  selector: 'app-nueva',
  standalone: true,
  imports: [NgFor, NgIf,ReactiveFormsModule, ModalComponent],
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

  newAnswer() {
    this.preguntas.push(new FormGroup({
      pregunta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required)
    }));
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

  delete() {
    this.preguntas.removeAt(this.item);
    this.isModalVisible = false;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  

  openModal(item: any) {
    this.selectedItem = item;
    this.isModalVisible = true;
  }
  
  itemValue(i: any){ this.item = i; }

}
