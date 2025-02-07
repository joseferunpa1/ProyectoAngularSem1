import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

  constructor(public router: Router) {}

  isSidebarToggled = false;
  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    console.log('Sidebar toggled:', this.isSidebarToggled);
  }
  navigateToAnother() {
    this.router.navigate(['/gestuser']);
  }
  
  navigateTo(){
    this.router.navigate(['/dashboard/list']);
  }

}
