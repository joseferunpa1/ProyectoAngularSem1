import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Input } from '@angular/core';
import { ActionsService } from '../services/actions.service';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  isModalVisible: boolean = false;
  selectedItem: any;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  showModal = false;

  constructor(public action: ActionsService) { }

  closeModal() {
    this.close.emit();
  }

  
  deleteAnswer() {
    this.action.deleteAnswer();
    this.isModalVisible = false;
  }
  
}
