import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-portfolio-category-edit',
  templateUrl: './portfolio-category-edit.component.html',
  styleUrls: ['./portfolio-category-edit.component.css']
})
export class PortfolioCategoryEditComponent implements OnInit {

  editModel: any = {};
    code: any;
    title = 'แก้ไขข้อมูลหมวดหมู่ผลิตภัณฑ์';
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
        if (this.code != '') {
          this.title = 'แก้ไขข้อมูลหมวดหมู่ผลิตภัณฑ์';
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
      this.serviceProviderService.post('portfolio/category/create', this.editModel).subscribe(data => {
        let model: any = {};
        model = data;
        if (model.status === 'S') {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
  
          setTimeout(() => {
            this.back();
          }, 2000);
        } else {
          this.spinner.hide();
          this.toastr.error(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        }
      }, err => {
        this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      });
    }
  
    read() {
      this.serviceProviderService.post('portfolio/category/read', { code: this.code, permission: 'all' }).subscribe(data => {
        let model: any = {};
        model = data;
        this.editModel = model.objectData[0];
      }, err => { });
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
      if (this.editModel.image != undefined)
        this.editModel.imageUrl = this.editModel.image[0].imageUrl;
      this.serviceProviderService.post('portfolio/category/update', this.editModel).subscribe(data => {
        let model: any = {};
        model = data;
        if (model.status === 'S') {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
  
          setTimeout(() => {
            this.back();
          }, 2000);
        } else {
          this.spinner.hide();
          this.toastr.error(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        }
      }, err => {
        this.spinner.hide();
        this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      });
    }
  
    back() {
      this.router.navigate(['portfolio-category'], { skipLocationChange: true });
    }

}
