import { TestBed } from '@angular/core/testing';

import { DeepstreamService } from './deepstream.service';

describe('DeepstreamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeepstreamService = TestBed.get(DeepstreamService);
    expect(service).toBeTruthy();
  });
});
