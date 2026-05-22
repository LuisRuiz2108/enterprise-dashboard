import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { MetricsService } from '../../services/metrics.service';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-region-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    BaseChartDirective,
  ],
  templateUrl: './region-chart.html',
  styleUrl: './region-chart.scss',
})
export class RegionChart implements OnInit {
  isLoading = signal<boolean>(true);

  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Total Population (B)',
        data: [],
        backgroundColor: [
          '#1976d2',
          '#42a5f5',
          '#0d47a1',
          '#64b5f6',
          '#1565c0',
          '#90caf9',
        ],
        borderRadius: 6,
      },
    ],
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y?.toFixed(2)}B people`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}B`,
        },
        grid: { color: '#f0f0f0' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getCountries().subscribe((data) => {
      const regionMap = new Map<string, number>();

      data.forEach((country) => {
        const current = regionMap.get(country.region) ?? 0;
        regionMap.set(country.region, current + country.population);
      });

      this.chartData = {
        ...this.chartData,
        labels: Array.from(regionMap.keys()),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Array.from(regionMap.values()).map((v) => v / 1_000_000_000),
          },
        ],
      };

      this.isLoading.set(false);
    });
  }
}