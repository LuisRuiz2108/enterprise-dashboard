import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY, shareReplay, map, expand, reduce } from 'rxjs';
import { environment } from '../../environments/environment';

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

// Shape of a country object returned by REST Countries v5 with the
// response_fields below. Only the fields we request are present.
interface V5Country {
  names: { common: string };
  population: number;
  region: string;
  codes: { alpha_3: string };
  flag: { url_png: string };
}

interface V5Response {
  data: {
    objects: V5Country[];
    meta: { total: number; count: number; limit: number; offset: number; more: boolean };
  };
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private readonly BASE_URL = 'https://api.restcountries.com/countries/v5';
  private readonly PAGE_SIZE = 100; // free-plan max per request
  private readonly FIELDS = 'names.common,population,region,codes.alpha_3,flag.url_png';
  private countries$: Observable<V5Country[]>;

  constructor(private http: HttpClient) {
    this.countries$ = this.fetchAllCountries().pipe(shareReplay(1));
  }

  // v5 is paginated (max 100 per page on the free plan), so we walk the pages
  // with `expand` until meta.more is false, then flatten every page's objects.
  private fetchAllCountries(): Observable<V5Country[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.restCountriesApiKey}`,
    });
    const page = (offset: number) =>
      this.http.get<V5Response>(
        `${this.BASE_URL}?response_fields=${this.FIELDS}&limit=${this.PAGE_SIZE}&offset=${offset}`,
        { headers }
      );

    return page(0).pipe(
      expand((res) =>
        res.data.meta.more ? page(res.data.meta.offset + this.PAGE_SIZE) : EMPTY
      ),
      reduce((acc, res) => acc.concat(res.data.objects), [] as V5Country[])
    );
  }

  getCountries(): Observable<TableRow[]> {
    return this.countries$.pipe(
      map((countries) =>
        [...countries]
          .sort((a, b) => b.population - a.population)
          .map((c, i) => ({
            id: i + 1,
            country: c.names.common,
            population: c.population,
            region: c.region,
            flag: c.flag.url_png,
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
