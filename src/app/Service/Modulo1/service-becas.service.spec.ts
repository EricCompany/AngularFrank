import { TestBed } from '@angular/core/testing';

import { ServiceBecasService } from './service-becas.service';

describe('ServiceBecasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceBecasService = TestBed.get(ServiceBecasService);
    expect(service).toBeTruthy();
  });
});
