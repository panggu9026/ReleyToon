import { TestBed } from '@angular/core/testing';

import { WebDbService } from './web-db.service';

describe('WebDbService', () => {
  let service: WebDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
