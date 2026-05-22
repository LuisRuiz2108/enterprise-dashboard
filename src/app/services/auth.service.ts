import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'auth_user';

  constructor( private router: Router) {}

  login( email: string, password: string): boolean {
    if (email === 'admin@dashboard.com' && password === 'admin123') {
      const user: User = {
        name: 'Luis Ruiz',
        email,
        role: 'Administrator',
      };
      localStorage.setItem( this.STORAGE_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem( this.STORAGE_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY)
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }
}