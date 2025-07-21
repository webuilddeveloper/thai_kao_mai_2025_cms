import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-splash-edit',
  templateUrl: './splash-edit.component.html',
  styleUrls: ['./splash-edit.component.css']
})
export class SplashEditComponent implements OnInit {

  editModel: any = {};
  code: any;
  title = 'เพิ่มข้อมูลภาพพักหน้าจอ';
  category: any;

  constructor(private fileuploadService: FileUploadService, private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      if (this.code != '') {
        this.title = 'แก้ไขข้อมูลภาพพักหน้าจอ';
        this.read();
      }

    });

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

  }

  create() {

    let isValid = false;
    if (this.editModel.timeOut == '') {
      this.toastr.warning('กรุณาใส่ระยะเวลา', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (isValid)
      return;

    this.spinner.show();
    this.editModel.timeOut = (this.editModel.timeOut * 1000).toString();
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    this.serviceProviderService.post('splash/create', this.editModel).subscribe(data => {

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
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });

  }

  read() {

    this.spinner.show();
    this.serviceProviderService.post('splash/read', { code: this.code }).subscribe(data => {

      let model: any = {}
      model = data;

      if (model.status === 'S') {

        this.spinner.hide();
        if (model.objectData.length > 0) {
          this.editModel = model.objectData[0];
          this.editModel.timeOut = (this.editModel.timeOut / 1000);
        }

      } else {

        this.spinner.hide();
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });

      }

    }, err => {

      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
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

    this.spinner.show();
    this.editModel.timeOut = (this.editModel.timeOut * 1000).toString();
    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    this.serviceProviderService.post('splash/update', this.editModel).subscribe(data => {

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

  back() {

    this.router.navigate(['splash'], { skipLocationChange: true });
    
  }

}
