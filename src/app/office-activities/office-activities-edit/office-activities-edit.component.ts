import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from '../../shared/service-provider.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploadService } from '../../shared/file-upload.service';
@Component({
  selector: 'app-office-activities-edit',
  templateUrl: './office-activities-edit.component.html',
  styleUrls: ['./office-activities-edit.component.css']
})
export class OfficeActivitiesEditComponent implements OnInit {

  editModel: any = { fileUrl: '' , file: [],sequence: 10, language: 'th' };
  code: any;
  title = 'เพิ่มข้อมูลกิจกรรมภายในออฟฟิศ';
  category: any;

  constructor(private fileuploadService: FileUploadService,
    private serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService, private toastr: ToastrService,
    private router: Router, private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      if (this.code != '') {
        this.title = 'แก้ไขข้อมูลกิจกรรมภายในออฟฟิศ';
        this.read();
      }

    });

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

  }

  create() {

    let isValid = false;
    if (this.editModel.image.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (isValid)
      return;

    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    this.spinner.show();

    this.serviceProviderService.post('OfficeActivities/create', this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      // if (this.editModel.gallery.length > 0) {
      //   this.editModel.gallery.forEach(element => {
      //     element.reference = model.objectData.code;
      //     element.imageUrl = element.imageUrl;
      //     this.serviceProviderService.post('OfficeActivities/gallery/create', element).subscribe(data => { }, err => { });
      //   });
      // }

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
    this.spinner.show();
    this.serviceProviderService.post('OfficeActivities/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel = model.objectData[0];
      // this.galleryRead();
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  update() {

    let isValid = false;
    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image != undefined)
    {
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

    this.serviceProviderService.post('OfficeActivities/update', this.editModel).subscribe(data => {

      // this.serviceProviderService.post('OfficeActivities/gallery/delete', this.editModel).subscribe(data => {
      //   if (this.editModel.gallery.length > 0) {
      //     this.editModel.gallery.forEach(element => {
      //       // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
      //       element.reference = this.editModel.code;
      //       element.imageUrl = element.imageUrl;
      //       this.serviceProviderService.post('OfficeActivities/gallery/create', element).subscribe(data => { }, err => { });
      //     });
      //   }
      // }, err => { });

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
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  galleryRead() {
    this.serviceProviderService.post('m/OfficeActivities/gallery/read', { code: this.editModel.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel.gallery = model.objectData;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  back() {
    this.router.navigate(['office-activities'], { skipLocationChange: true });
  }

}
