import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-logo-edit',
  templateUrl: './logo-edit.component.html',
  styleUrls: ['./logo-edit.component.css']
})
export class LogoEditComponent implements OnInit {
  Editor = ClassicEditor;
  listCategory: any = [];
  editModel: any = {};
  code: any;
  title = 'เพิ่มข้อมูลรูปภาพโลโก้';
  category: any;

  constructor(private fileuploadService: FileUploadService
    , private serviceProviderService: ServiceProviderService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private router: Router
    , private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      // this.readCategory();
      if (this.code != '') {
        this.title = 'แก้ไขข้อมูลรูปภาพโลโก้';
        this.read();
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

    if (this.editModel.image.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (isValid)
      return;

    this.spinner.show();
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    this.serviceProviderService.post('menu/create', this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });

      setTimeout(() => {
        this.back();
      }, 2000);

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  read() {
    this.serviceProviderService.post('menu/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel = model.objectData[0];
      
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
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

    if (isValid) {
      return;
    }

    if (this.editModel.image !== undefined) {
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    }

    this.spinner.show();
    this.serviceProviderService.post('menu/update', this.editModel).subscribe(data => {

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });

      setTimeout(() => {
        this.back();
      }, 2000);

    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readCategory() {
    this.serviceProviderService.post('m/menu/category/read', {}).subscribe(data => {
      let model: any = {};
      model = data;
      this.listCategory = [];
      model.objectData.forEach(element => {
        this.listCategory.push({ value: element.title, display: element.title });
      });
    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  back() {
    this.router.navigate(['logo'], { skipLocationChange: true });
  }

}
