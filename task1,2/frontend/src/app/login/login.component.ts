import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
    imports: [FormsModule, HttpClientModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:4000/login', loginData).subscribe(
      (response: any) => {
        if (response && response.message === 'Login successful') {
          // Save JWT token in local storage
          localStorage.setItem('token', response.token);
          this.router.navigate(['home']);
        } else {
          console.error('Unexpected response from the server:', response);
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        if (error.status === 400) {
          alert('Invalid username or password');
        } else {
          alert('Server error. Please try again later.');
        }
      }
    );
  }

  onRegister() {
    this.router.navigate(['register']); // Navigate to Register page
  }
}
