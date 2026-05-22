import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionChart } from './region-chart';

describe('RegionChart', () => {
  let component: RegionChart;
  let fixture: ComponentFixture<RegionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
