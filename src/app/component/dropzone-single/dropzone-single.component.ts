import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';

@Component({
  selector: 'cds',
  templateUrl: './dropzone-single.component.html',
  styleUrls: ['./dropzone-single.component.css']
})
export class DropzoneSingleComponent implements OnInit {
  imagePdf = './assets/img/267px-PDF_file_icon.svg.png';
  @Input() label;
  @Input() data: any = [];
  @Input() code = 'none';
  @Output() cModel = new EventEmitter<string>();
  @Input() readonly = false;

  constructor(private fileuploadService: FileUploadService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.data[0].imageUrl == '' || this.data[0].imageUrl == undefined)
      this.data = [];

    this.cModel.emit(this.data);
  }

  onSelectApi(event) {
    // console.log('event', event);

    if (event.addedFiles[0].type == 'image/png' || event.addedFiles[0].type == 'image/jpeg' || event.addedFiles[0].type == 'image/gif') {
      if (event.addedFiles[0].size > 10000000) {
        event.addedFiles = [];
        return this.toastr.warning('รูปภาพต้องมีขนาดไม่เกิน 10 mb', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }else{
        let type = event.addedFiles[0].type || '';
        event.addedFiles = [];
        return this.toastr.warning('ไม่รองรับรูปแบบไฟล์ : ' + type , 'แจ้งเตือนระบบ', { timeOut: 2000 });
    }

    this.fileuploadService.postFile(this.code, event.addedFiles[0]).subscribe(data => {

      this.data[0] = data;
      // if (this.data[0].imageType == 'application/pdf') {
      //   this.data[0].filePdf = this.data[0].imageUrl;
      //   this.data[0].imageUrl = this.imagePdf;
      // }

      this.cModel.emit(this.data);
    }, err => {
      console.log('error ',err);

     });
  }

  onRemoveApi(event) {
    this.data.splice(this.data.indexOf(event), 1);
    this.cModel.emit(this.data);
  }

  emit(param) {
    this.cModel.emit(param);
  }

}
