import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLogout() {
    // Clear JWT token on logout
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['']); // Redirect to login page
  }
  onAddCourse() {
    this.router.navigate(['add-course']);
  }
  onDisplay(){
    this.router.navigate(['display']);

  }
  
}
