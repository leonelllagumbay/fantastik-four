import { TestBed, inject } from '@angular/core/testing';

import { ConnectFourService } from './connect-four.service';

describe('ConnectFourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectFourService]
    });
  });

  it('should be created', inject([ConnectFourService], (service: ConnectFourService) => {
    expect(service).toBeTruthy();
  }));
});
