import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, map } from 'rxjs';

export interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: string;
}

export interface TableRow {
  id: number;
  country: string;
  population: number;
  region: string;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly BASE_URL = 'https://restcountries.com/v3.1';
  private countries$: Observable<any[]>;

  constructor(private http: HttpClient) {
    this.countries$ = this.http
      .get<any[]>(`${this.BASE_URL}/all?fields=name,population,region,flags,cca3`)
      .pipe(shareReplay(1));
  }

  getCountries(): Observable<TableRow[]> {
    return this.countries$.pipe(
      map((countries) =>
        countries
          .sort((a, b) => b.population - a.population)
          .slice(0, 50)
          .map((c, i) => ({
            id: i + 1,
            country: c.name.common,
            population: c.population,
            region: c.region,
            flag: c.flags.svg,
          }))
      )
    );
  }

  getStats(): Observable<StatCard[]> {
    return this.countries$.pipe(
      map((countries) => {
        const total = countries.reduce((sum, c) => sum + c.population, 0);
        const regions = new Set(countries.map((c) => c.region)).size;
        return [
          {
            title: 'Total Countries',
            value: countries.length.toString(),
            change: 2.4,
            icon: 'public',
          },
          {
            title: 'World Population',
            value: (total / 1_000_000_000).toFixed(2) + 'B',
            change: 1.1,
            icon: 'people',
          },
          {
            title: 'Regions',
            value: regions.toString(),
            change: 0,
            icon: 'map',
          },
          {
            title: 'Avg Population',
            value: (total / countries.length / 1_000_000).toFixed(1) + 'M',
            change: -0.5,
            icon: 'analytics',
          },
        ];
      })
    );
  }
}