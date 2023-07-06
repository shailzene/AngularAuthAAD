import { TestBed } from '@angular/core/testing';

import { AzureaddemoService } from './azureaddemo.service';

describe('AzureaddemoService', () => {
  let service: AzureaddemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureaddemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
