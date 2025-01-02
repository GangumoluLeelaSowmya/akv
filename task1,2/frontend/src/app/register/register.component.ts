import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  phoneNumber: string = '';
  gender: string = 'Male';
  dateOfBirth: string = '';

  errors: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  validateField(field: string) {
    switch (field) {
      case 'username':
        this.errors.username =
          this.username.trim() === ''
            ? 'Username is required'
            : this.username.length < 3
            ? 'Username must be at least 3 characters long'
            : '';
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.errors.email =
          this.email.trim() === ''
            ? 'Email is required'
            : !emailPattern.test(this.email)
            ? 'Please enter a valid email address'
            : '';
        break;

      case 'phoneNumber':
        const phonePattern = /^\d{10}$/;
        this.errors.phoneNumber =
          this.phoneNumber.trim() === ''
            ? 'Phone number is required'
            : !phonePattern.test(this.phoneNumber)
            ? 'Phone number must be exactly 10 digits long'
            : '';
        break;

      case 'password':
        const passwordPattern =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        this.errors.password =
          this.password.trim() === ''
            ? 'Password is required'
            : !passwordPattern.test(this.password)
            ? 'Password must contain at least one uppercase letter, one number, and one special character'
            : '';
        break;

      case 'dateOfBirth':
        const selectedDate = new Date(this.dateOfBirth);
        const today = new Date();
        this.errors.dateOfBirth =
          this.dateOfBirth.trim() === ''
            ? 'Date of Birth is required'
            : selectedDate > today
            ? 'Date of Birth cannot be a future date'
            : '';
        break;

      default:
        break;
    }
  }

  onRegister() {
    // Validate all fields before submitting
    ['username', 'email', 'phoneNumber', 'password', 'dateOfBirth'].forEach(
      (field) => this.validateField(field)
    );

    if (Object.keys(this.errors).some((key) => this.errors[key])) {
      alert('Please correct the highlighted errors.');
      return;
    }

    const registerData = {
      username: this.username,
      password: this.password,
      email: this.email,
      phoneNumber: this.phoneNumber,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
    };

    this.http.post('http://localhost:4000/register', registerData).subscribe(
      (response: any) => {
        if (response && response.message === 'User registered successfully') {
          alert('Registration successful');
          this.router.navigate(['']);
        } else {
          alert('Error during registration');
        }
      },
      (error: any) => {
        alert(
          error.error && error.error.message
            ? error.error.message
            : 'Error during registration'
        );
        console.error('Error:', error);
      }
    );
  }
}
