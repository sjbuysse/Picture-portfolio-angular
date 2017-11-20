import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpEvent } from '@angular/common/http';

@Injectable()
export class CloudinaryService {
  // cloudinary variables
  // TODO: these should not be here but somewhere in an environment
  cloudName = 'portfoliomarie';
  unsignedUploadPreset = 'rpyiu7lh';

  constructor(private _http: HttpClient) {
  }

  uploadImage(file: File): Observable<HttpEvent<any>> {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const fd = this.createCloudinaryFormData(this.unsignedUploadPreset, file);
    const req = new HttpRequest('POST', url, fd, {
      reportProgress: true,
    });

    // Via this API, you get access to the raw event stream, and track the progress.
    return this._http.request(req);
  }

  private createCloudinaryFormData(unsignedUploadPreset: string, file: File): FormData {
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('file', file);
    return fd;
  }
}
