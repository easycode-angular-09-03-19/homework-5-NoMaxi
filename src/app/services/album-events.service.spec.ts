import { TestBed } from '@angular/core/testing';

import { AlbumEventsService } from './album-events.service';

describe('AlbumEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlbumEventsService = TestBed.get(AlbumEventsService);
    expect(service).toBeTruthy();
  });
});
