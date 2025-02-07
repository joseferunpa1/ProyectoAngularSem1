import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent{
  public username: string = ''; // Define username como propiedad pública
  public password: string = ''; // Define password como propiedad pública

  constructor(private router: Router) {}

  onSubmit() {
    // Lógica de autenticación aquí
    if (this.username && this.password) {
      // Redireccionar a otro componente
        this.router.navigate(['/dashboard-admin']);
    
    } else {
      alert("Por favor, ingresa tu usuario y contraseña.");
    }
  }

}


