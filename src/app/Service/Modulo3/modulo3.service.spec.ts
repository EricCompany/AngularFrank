import { TestBed } from '@angular/core/testing';

import { Modulo3Service } from './modulo3.service';

describe('Modulo3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Modulo3Service = TestBed.get(Modulo3Service);
    expect(service).toBeTruthy();
  });
});
