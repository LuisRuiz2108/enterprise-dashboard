import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Header } from '../../components/header/header';
import { StatsCard } from '../../components/stats-card/stats-card';
import { DataTable } from '../../components/data-table/data-table';
import { RegionChart } from '../../components/region-chart/region-chart';
import { MetricsService, StatCard } from '../../services/metrics.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    Sidebar,
    Header,
    StatsCard,
    DataTable,
    RegionChart,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  sidebarOpen = signal<boolean>(true);
  stats = signal<StatCard[]>([]);
  isLoading = signal<boolean>(true);

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getStats().subscribe((data) => {
      this.stats.set(data);
      this.isLoading.set(false);
    });
  }
}