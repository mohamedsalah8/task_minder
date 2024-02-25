import { TestBed } from '@angular/core/testing';

import { ApiFunctionServiceService } from './api-function-service.service';

describe('ApiFunctionServiceService', () => {
  let service: ApiFunctionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFunctionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
