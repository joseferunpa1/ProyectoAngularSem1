import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { RouterLink,RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  constructor(public action: ActionsService) { }

  ngOnInit(): void {}

  deleteAnswer(){ this.action.deleteAnswer(); }

  
}
