import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  isOpen = input<boolean>(true);
  activeRoute = signal<string>('/dashboard');

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Analytics', icon: 'bar_chart', route: '/dashboard' },
    { label: 'Countries', icon: 'public', route: '/dashboard' },
    { label: 'Settings', icon: 'settings', route: '/dashboard' },
  ];

  constructor(private router: Router) {}

  navigate(route: string): void {
    this.activeRoute.set(route);
    this.router.navigate([route]);
  }
}