import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cdm',
  templateUrl: './dropzone-multi.component.html',
  styleUrls: ['./dropzone-multi.component.css']
})
export class DropzoneMultiComponent implements OnInit {

  @Input() label;
  @Input() data: any = [];
  @Input() code = 'none';
  @Output() cModel = new EventEmitter<string>();

  constructor(private fileuploadService: FileUploadService, private toastr: ToastrService, private http: HttpClient, private provide: FileUploadService) { }

  ngOnInit(): void {
    this.cModel.emit(this.data);
  }

  onSelectApi(event, param) {
    // console.log('event', event);

    for (let index = 0; index < event.addedFiles.length; index++) {

      if (event.addedFiles[index].type == 'image/png' || event.addedFiles[index].type == 'image/jpeg' || event.addedFiles[index].type == 'image/gif') {
        if (event.addedFiles[index].size > 10000000) {
          event.addedFiles = [];
          return this.toastr.warning('รูปภาพต้องมีขนาดไม่เกิน 10 mb', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        }
      } else {
        let type = event.addedFiles[index].type || '';
        event.addedFiles = [];
        return this.toastr.warning('ไม่รองรับรูปแบบไฟล์ : ' + type, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }

    const endpoint = this.provide.endpoint;
    let idx = 1;
    for (var i = 0; i < event.addedFiles.length; i++) {
      let formData = new FormData();
      formData.append('Image', event.addedFiles[i], event.addedFiles[i].name);
      formData.append('ImageCaption', this.code);
      this.http.post(endpoint, formData).subscribe(async data => {
        // let model: any = {};
        // model = data;
        // model.sequence = idx++;
        // this.data.push(model);
        // this.cModel.emit(this.data);
        await this.data.push(data);
        await this.data.map((x) => {
          let indexOf = this.data.indexOf(x);
          x.sequence = indexOf+1;
          this.cModel.emit(this.data);
        })
      });
    }
    // this.fileuploadService.postFile(this.code, event.addedFiles).subscribe(data => {
    //     this.data.push(data);
    //     this.cModel.emit(this.data);
    // });
  }

  onRemoveApi(event, param) {
    // this.data.splice(this.data.indexOf(event), 1);
    this.data.splice(this.data.indexOf(event), 1);
    this.data.map((x) => {
      let indexOf = this.data.indexOf(x);
      x.sequence = indexOf+1;
      this.cModel.emit(this.data);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    let index = 0;
    this.data.forEach(c => {
      index++;
      c.sequence = index;
    });
  }
}
