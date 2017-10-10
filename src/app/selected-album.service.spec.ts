import { TestBed, inject } from '@angular/core/testing';

import { SelectedAlbumService } from './selected-album.service';

describe('SelectedAlbumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedAlbumService]
    });
  });

  it('should be created', inject([SelectedAlbumService], (service: SelectedAlbumService) => {
    expect(service).toBeTruthy();
  }));
});
