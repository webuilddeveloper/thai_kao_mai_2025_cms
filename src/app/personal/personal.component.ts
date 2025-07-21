import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  listPage: any = [];
  editModel: any = {};
  prefixNameModel = [{ value: 'นาย', display: 'นาย' }, { value: 'นาง', display: 'นาง' }, { value: 'นางสาว', display: 'นางสาว' }, { value: '', display: 'อื่นๆ' }];
  code: any;
  user: string = '';

  constructor(private fileuploadService: FileUploadService, private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.hide();

    if (localStorage.getItem('userCode') != null) {
      this.user = localStorage.getItem('userCode');

      this.read();
    }
  }

  read() {
    this.spinner.show();
    this.serviceProviderService.post('register/read', { code: this.user }).subscribe(data => {

      let model: any = {};
      model = data;
      if (model.objectData.length > 0)
        this.editModel = model.objectData[0];
      this.editModel.prefixName2 = "";
      if (this.editModel.prefixName) {
        if (this.prefixNameModel.find(f => f.value == this.editModel.prefixName) == undefined) {
          this.editModel.prefixName2 = this.editModel.prefixName;
          this.editModel.prefixName = "";
        }
      }else 
      this.editModel.prefixName = "นาย";

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });
  }

  create() {
    let isValid = false;
    // if (this.editModel.title == '') {
    //   this.toastr.warning('กรุณาใส่ชื่อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
    //   isValid = true;
    // }

    if (this.editModel.imageLogo.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพโลโก้', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (isValid)
      return;

    this.spinner.show();

    this.editModel.prefixName = this.editModel.prefixName == '' ? this.editModel.prefixName2 : this.editModel.prefixName;
    this.editModel.imageLogoUrl = this.editModel.image[0].imageUrl;

    if (this.editModel.imageBg != undefined)
      this.editModel.imageBgUrl = this.editModel.imageBg[0].imageUrl;

    this.serviceProviderService.post('register/create', this.editModel).subscribe(data => {
      let model: any = {}
      model = data;
      if (model.status === 'S') {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

        setTimeout(() => {
          this.spinner.show();
          window.location.reload();
        },1000)

      } else {
        this.spinner.hide();
        this.toastr.error(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  update() {
    let isValid = false;
    // if (this.editModel.title == '') {
    //   this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
    //   isValid = true;
    // }

    if (this.editModel.image != undefined) {
      if (this.editModel.image.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (isValid)
      return;

    this.spinner.show();

    this.editModel.prefixName = this.editModel.prefixName == '' ? this.editModel.prefixName2 : this.editModel.prefixName;

    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    this.serviceProviderService.post('register/update', this.editModel).subscribe(data => {
      let model: any = {}
      model = data;
      if (model.status === 'S') {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });

        setTimeout(() => {
          this.spinner.show();
          window.location.reload();
        },1000)
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
    // this.router.navigate(['news'], { skipLocationChange: true });
  }

}
