import { TestBed } from '@angular/core/testing';
import { ServiceVenta } from './serviceventa';

describe('Serviceventa', () => {
  let service: ServiceVenta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceVenta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
