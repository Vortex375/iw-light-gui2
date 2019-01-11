import { TestBed } from '@angular/core/testing';

import { UserTemplatesService } from './user-templates.service';

describe('UserTemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTemplatesService = TestBed.get(UserTemplatesService);
    expect(service).toBeTruthy();
  });
});
