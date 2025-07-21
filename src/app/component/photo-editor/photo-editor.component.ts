import { ToastrService } from "ngx-toastr";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FileUploadService } from "src/app/shared/file-upload.service";
import { CroppedEvent } from "ngx-photo-editor";

@Component({
  selector: "phe",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"],
})
export class PhotoEditorComponent implements OnInit {
  imagePdf = "./../../../assets/img/267px-PDF_file_icon.svg.png";
  @Input() label;
  @Input() data: any = [];
  @Input() code = "none";
  @Output() cModel = new EventEmitter<string>();
  @Input() readonly = false;

  constructor(
    private fileuploadService: FileUploadService,
    private toastr: ToastrService
  ) {}
  imageChangedEvent: any;
  base64: any;
  isChkImg: boolean;
  @ViewChild("myInput")
  myInputVariable: ElementRef;

  ngOnInit(): void {
    if (this.data[0].imageUrl == "") {
      this.data = [];
      this.isChkImg = false;
    } else {
      this.isChkImg = true;
    }

    this.cModel.emit(this.data);
  }

  onSelectApi(event) {
    // console.log('event', event);
    if (
      event.file.type == "image/png" ||
      event.file.type == "image/jpeg" ||
      event.file.type == "image/gif"
    ) {
      if (event.file.size > 10000000) {
        event.file = [];
        return this.toastr.warning(
          "รูปภาพต้องมีขนาดไม่เกิน 10 mb",
          "แจ้งเตือนระบบ",
          { timeOut: 2000 }
        );
      }
    } else {
      let type = event.file.type || "";
      event.file = [];
      return this.toastr.warning(
        "ไม่รองรับรูปแบบไฟล์ : " + type,
        "แจ้งเตือนระบบ",
        { timeOut: 2000 }
      );
    }

    this.fileuploadService.postFile(this.code, event.file).subscribe(
      (data) => {
        this.data[0] = data;
        // if (this.data[0].imageType == 'application/pdf') {
        //   this.data[0].filePdf = this.data[0].imageUrl;
        //   this.data[0].imageUrl = this.imagePdf;
        // }

        this.cModel.emit(this.data);
      },
      (err) => {
        console.log("error ", err);
      }
    );
  }

  onRemoveApi(event) {
    this.data.splice(this.data.indexOf(event), 1);
    this.cModel.emit(this.data);
    // this.myInputVariable.nativeElement.value = "";
    this.isChkImg = false;
  }

  emit(param) {
    this.cModel.emit(param);
  }

  fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    this.imageChangedEvent.target = {};

    this.imageChangedEvent.target.files = event.addedFiles;
  }

  imageCropped(event: CroppedEvent) {
    this.base64 = event.base64;
    this.onSelectApi(event);
    this.isChkImg = true;
  }
}
