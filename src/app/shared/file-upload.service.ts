import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  endpoint: string = 'https://www.thaikaomai.or.th/thai-kao-mai-document/upload';
  // endpoint: string = 'https://209.15.96.238/vet-document/upload';

  constructor(private http: HttpClient) { }

  postFile(caption: string, fileToUpload: File) {
    // const endpoint = 'https://vet.we-builds.com/vet-document/upload';
    // const endpoint = 'https://122.155.223.63/td-doc/upload';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(this.endpoint, formData);
  }

  get() {
    return this.http.get('https://kascoit.ddns.me:99/publish/api/Product');
  }

  post() {
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    // let options = new RequestOptions();
    // options.headers = headers;
    return this.http.post('https://localhost:5001/upload/post', {}, { headers: headers });
  }

  postFileBuffer(caption: string, fileToUpload: File) {
    const endpoint = 'https://localhost:5001/upload';
    // const endpoint = 'https://122.155.223.63/td-doc/upload';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(endpoint, formData, {
      responseType: "arraybuffer"
    });
  }

}
