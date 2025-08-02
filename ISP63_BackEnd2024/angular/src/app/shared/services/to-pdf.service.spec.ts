import { TestBed } from '@angular/core/testing';

import { ToPdfService } from './to-pdf.service';

describe('ToPdfService', () => {
  let service: ToPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
