import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TacheService } from './tache.service';

describe('TacheService', () => {
  let service: TacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TacheService],
    });
    service = TestBed.inject(TacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
