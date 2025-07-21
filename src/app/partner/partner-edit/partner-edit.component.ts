import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css']
})
export class PartnerEditComponent implements OnInit {

  title = 'เพิ่มข้อมูลผู้สนับสนุน';
  editModel: any = { fileUrl: '', file: [], sequence: 10, language: 'th' };
  code: any;
  category: any;
  size = "80 x 80";

  constructor(private fileuploadService: FileUploadService, private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      if (this.code != '') {
        this.read();
        this.title = 'แก้ไขข้อมูลผู้สนับสนุน';
      }

    });

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

  }

  create() {

    let isValid = false;
    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.linkUrl == '') {
      this.toastr.warning('กรุณาใส่ลิ้งค์แหล่งอ้างอิง', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (isValid)
      return;

    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    this.spinner.show();

    this.serviceProviderService.post('partner/create', this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      if (this.editModel.gallery.length > 0) {
        this.editModel.gallery.forEach(element => {
          element.reference = model.objectData.code;
          element.imageUrl = element.imageUrl;
          this.serviceProviderService.post('partner/gallery/create', element).subscribe(data => { }, err => { });
        });
      }

      if (model.status === 'S') {
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        setTimeout(() => {
          this.back();
        }, 2000);

      } else {
        this.spinner.hide();
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  read() {
    this.serviceProviderService.post('partner/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel = model.objectData[0];
      this.galleryRead();
    }, err => { this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 }); });
  }

  update() {
    let isValid = false;
    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.linkUrl == '') {
      this.toastr.warning('กรุณาใส่ลิ้งค์แหล่งอ้างอิง', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image != undefined) {
      if (this.editModel.image.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (isValid)
      return;

    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    this.spinner.show();

    this.serviceProviderService.post('partner/update', this.editModel).subscribe(data => {

      this.serviceProviderService.post('partner/gallery/delete', this.editModel).subscribe(data => {
        if (this.editModel.gallery.length > 0) {
          this.editModel.gallery.forEach(element => {
            // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
            element.reference = this.editModel.code;
            element.imageUrl = element.imageUrl;
            this.serviceProviderService.post('partner/gallery/create', element).subscribe(data => { }, err => { });
          });
        }
      }, err => { });

      let model: any = {}
      model = data;

      if (model.status === 'S') {
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        setTimeout(() => {
          this.back();
        }, 2000);

      } else {
        this.spinner.hide();
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }

    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  galleryRead() {
    this.serviceProviderService.post('m/partner/gallery/read', { code: this.editModel.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel.gallery = model.objectData;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  back() {
    this.router.navigate(['partner'], { skipLocationChange: true });
  }

  setSize(param) {
    this.editModel.imageSize = param;
    if (param == "ss")
      this.size = "43.5 x 46";
    else if (param == "s")
      this.size = "87 x 92";
    else if (param == "m")
      this.size = "130.5 x 138";
    else if (param == "l")
      this.size = "174 x 184";
    else if (param == "xl")
      this.size = "217.5 x 230";
  }

  setPage(param) {
    this.editModel.mainPage = param
    this.editModel.newsPage = param
    this.editModel.eventPage = param
    this.editModel.imageEventPage = param
    this.editModel.knowledgePage = param
    this.editModel.lawPage = param
    this.editModel.expertBranchPage = param
    // this.editModel.verifyApprovedUserPage = param
    this.editModel.trainingInstitutePage = param
    // this.editModel.personnelPage = param,
    // this.editModel.contactPage = param,
    // this.editModel.importantPage = param,
    // this.editModel.knowledgeVetPage = param,
    // this.editModel.vetEnewsPage = param

  }
}
