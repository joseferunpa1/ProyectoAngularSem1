import { TestBed } from '@angular/core/testing';

import { ActionsService } from './actions.service';

describe('EncuestasServiceService', () => {
  let service: ActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
