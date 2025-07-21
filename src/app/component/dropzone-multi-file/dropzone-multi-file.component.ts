import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { HttpClient } from '@angular/common/http';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'cdmf',
  templateUrl: './dropzone-multi-file.component.html',
  styleUrls: ['./dropzone-multi-file.component.css']
})
export class DropzoneMultiFileComponent implements OnInit {

  @Input() label;
  @Input() data: any = [];
  @Input() code = 'none';
  @Output() cModel = new EventEmitter<string>();

  constructor(private fileuploadService: FileUploadService, private toastr: ToastrService, private http: HttpClient, private provide: FileUploadService) { }
  imagePdf = './assets/img/267px-PDF_file_icon.svg.png';
  imageExcel = './assets/img/excel.png';
  imageVDO = './assets/img/vdo.png';
  imageWord = './assets/img/word.png';

  ngOnInit(): void {
    this.cModel.emit(this.data);
  }

  onSelectApi(event, param) {
    // console.log('event', event);
    
    for (let index = 0; index < event.addedFiles.length; index++) {
      if (event.addedFiles[index].type == 'application/pdf'
        || event.addedFiles[index].type == 'video/mp4'
        || event.addedFiles[index].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || event.addedFiles[index].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        || event.addedFiles[index].type == 'application/msword') {
        if (event.addedFiles[index].size > 100000000) {
          event.addedFiles = [];
          return this.toastr.warning('ไฟล์ต้องมีขนาดไม่เกิน 100 mb', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        }
      }
      else {
        let type = event.addedFiles[index].type || '';
        event.addedFiles = [];
        return this.toastr.warning('ไม่รองรับรูปแบบไฟล์ : ' + type, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }

    const endpoint = this.provide.endpoint;
    for (var i = 0; i < event.addedFiles.length; i++) {
      let data: any = {};
      let formData = new FormData();
      formData.append('Image', event.addedFiles[i], event.addedFiles[i].name);
      var path = this.code;
      if (data.imageType == 'application/pdf')
        path = "pdf";
      else if (data.imageType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        path = "excel";
      else if (data.imageType == 'video/mp4')
        path = "mp4";
      else if (data.imageType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        path = "word";
      else if (data.imageType == 'application/msword')
        path = "word";
      
      formData.append('ImageCaption', path);
      this.http.post(endpoint, formData).subscribe(async datas => {
        data = datas;
        data.title = data.imageName;
        data.size = data.imageSize.toString();
        if (data.imageType == 'application/pdf') {
          data.type = "pdf";
          data.image = this.imagePdf;
        }
        else if (data.imageType == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          data.type = "excel";
          data.image = this.imageExcel;
        }
        else if (data.imageType == 'video/mp4') {
          data.type = "mp4";
          data.image = this.imageVDO;
        }
        else if (data.imageType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
          data.type = "word";
          data.image = this.imageWord;
        }
        else if (data.imageType == 'application/msword'){
          data.type = "word";
          data.image = this.imageWord;
        }

        this.data.push(data);
        this.cModel.emit(this.data);
      });
    }
    // this.fileuploadService.postFile(this.code, event.addedFiles).subscribe(data => {
    //     this.data.push(data);
    //     this.cModel.emit(this.data);
    // });
  }

  onRemoveApi(event, param) {
    this.data.splice(this.data.indexOf(event), 1);
  }

}
