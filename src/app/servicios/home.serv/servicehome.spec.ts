import { TestBed } from '@angular/core/testing';
import { Servicehome } from './servicehome';

describe('Servicehome', () => {
  let service: Servicehome;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicehome);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
