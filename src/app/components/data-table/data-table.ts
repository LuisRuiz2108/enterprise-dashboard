import { Component, OnInit, viewChild, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MetricsService, TableRow } from '../../services/metrics.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
})
export class DataTable implements OnInit {
  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  displayedColumns = ['id', 'flag', 'country', 'population', 'region'];
  dataSource = new MatTableDataSource<TableRow>();
  isLoading = signal<boolean>(true);
  filterValue = signal<string>('');

  constructor(private metricsService: MetricsService) {
    effect(() => {
      const paginator = this.paginator();
      const sort = this.sort();
      if (paginator) this.dataSource.paginator = paginator;
      if (sort) this.dataSource.sort = sort;
    });
  }

  ngOnInit(): void {
    this.metricsService.getCountries().subscribe((data) => {
      this.dataSource.data = data;
      this.isLoading.set(false);
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filterValue.set(value);
    this.dataSource.filter = value.trim().toLowerCase();
  }
}