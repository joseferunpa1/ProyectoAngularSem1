import { Component, OnInit} from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { RouterLink,RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  constructor(public action: ActionsService) { }

  isSidebarToggled = false;

  ngOnInit(): void {}

  deleteAnswer(){ this.action.deleteAnswer(); }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    console.log('Sidebar toggled:', this.isSidebarToggled);
  }

}
