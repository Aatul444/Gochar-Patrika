import { TestBed } from '@angular/core/testing';

import { SnewspaperService } from './snewspaper.service';

describe('SnewspaperService', () => {
  let service: SnewspaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnewspaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
