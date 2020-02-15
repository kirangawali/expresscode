import { TestBed } from '@angular/core/testing';

import { MainDataService } from './main-data.service';

describe('MainDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainDataService = TestBed.get(MainDataService);
    expect(service).toBeTruthy();
  });
});
