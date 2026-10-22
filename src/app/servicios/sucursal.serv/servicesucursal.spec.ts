import { TestBed } from '@angular/core/testing';
import { Servicesucursal } from './servicesucursal';

describe('Servicesucursal', () => {
  let service: Servicesucursal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicesucursal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
