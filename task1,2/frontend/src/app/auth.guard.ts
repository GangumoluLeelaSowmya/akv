import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      // Redirect to login if localStorage is not available
      this.router.navigate(['']);
      return false;
    }

    const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists
    if (!isAuthenticated) {
      this.router.navigate(['']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}
