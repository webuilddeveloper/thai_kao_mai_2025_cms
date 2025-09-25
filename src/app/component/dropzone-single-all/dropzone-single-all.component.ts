import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { FileUploadService } from "src/app/shared/file-upload.service";

@Component({
  selector: "cdsa",
  templateUrl: "./dropzone-single-all.component.html",
  styleUrls: ["./dropzone-single-all.component.css"],
})
export class DropzoneSingleAllComponent implements OnInit {
  imagePdf = "./assets/img/267px-PDF_file_icon.svg.png";
  imageExcel = "./assets/img/excel.png";
  imageVDO = "./assets/img/vdo.png";
  @Input() label;
  @Input() data: any = [];
  @Input() code = "none";
  @Output() cModel = new EventEmitter<string>();

  constructor(
    private fileuploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.data[0].imageUrl == "" || this.data[0].imageUrl == undefined)
      this.data = [];

    this.cModel.emit(this.data);
  }

  onSelectApi(event) {
    if (
      event.addedFiles[0].type == "application/pdf" ||
      event.addedFiles[0].type == "image/png" ||
      event.addedFiles[0].type == "image/jpeg" ||
      event.addedFiles[0].type == "image/gif" ||
      event.addedFiles[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      if (event.addedFiles[0].size > 100000000) {
        event.addedFiles = [];
        return this.toastr.warning(
          "ไฟล์ต้องมีขนาดไม่เกิน 100 mb",
          "แจ้งเตือนระบบ",
          { timeOut: 2000 }
        );
      }
    } else {
      let type = event.addedFiles[0].type || "";
      event.addedFiles = [];
      return this.toastr.warning(
        "ไม่รองรับรูปแบบไฟล์ : " + type,
        "แจ้งเตือนระบบ",
        { timeOut: 2000 }
      );
    }

    this.fileuploadService.postFile(this.code, event.addedFiles[0]).subscribe(
      (data) => {
        this.data[0] = data;
        if (this.data[0].imageType == "application/pdf") {
          this.data[0].fileUrl = this.data[0].imageUrl;
          this.data[0].imageUrl = this.imagePdf;
        } else if (
          this.data[0].imageType ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          this.data[0].fileUrl = this.data[0].imageUrl;
          this.data[0].imageUrl = this.imageExcel;
        }
        // else if (this.data[0].imageType == 'video/mp4') {
        //   this.data[0].fileUrl = this.data[0].imageUrl;
        //   this.data[0].imageUrl = this.imageVDO;
        // }
        else {
          this.data[0].fileUrl = this.data[0].imageUrl;
          this.data[0].imageUrl = this.data[0].imageUrl;
        }

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
  }

  emit(param) {
    this.cModel.emit(param);
  }

  openFile(param) {
    let link = param.fileUrl ?? "";
    if (link == "") {
      link = param.imageUrl;
    }
    window.open(link, "_blank");
  }
}
