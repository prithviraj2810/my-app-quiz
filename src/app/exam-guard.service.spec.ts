import { TestBed } from '@angular/core/testing';

import { ExamGuardService } from './exam-guard.service';

describe('ExamGuardService', () => {
  let service: ExamGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
