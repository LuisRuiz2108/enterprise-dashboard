import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { MetricsService } from './metrics.service';

describe('Metrics', () => {
  let service: MetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
