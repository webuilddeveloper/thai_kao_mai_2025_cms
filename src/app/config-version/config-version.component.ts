import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from '../shared/service-provider.service';

@Component({
  selector: 'app-config-version',
  templateUrl: './config-version.component.html',
  styleUrls: ['./config-version.component.css']
})
export class ConfigVersionComponent implements OnInit {

  navigation1: string = 'จัดการ Version';
  navigation2: string = 'Config';
  navigation3: string = 'จัดการ Version';
  urlCreate: string = 'version/create';
  urlRead: string = 'version/read';
  urlUpdate: string = 'version/update';
  urlDelete: string = 'version/delete';

  models: any = [
    // {
    //   platform: 'Android',
    //   version: '2.0.3',
    //   isActive: true,
    //   isForce: true,
    //   description: 'อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน อัพเดทค้นหาโรงเรียน',
    //   url: '',
    //   updateDate: '20210303110000',
    //   updateBy: 'admin'
    // },
  ];
  paginationModel: any = {};
  searchModel: any = {};
  itemSelected: boolean;

  isChecked: boolean = false;
  isForm: boolean = false;
  model: any = {};
  listCategory: any = [];
  imageFile: any;

  constructor(private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.read();
  }

  back() {
    this.navigation3 = 'จัดการ Version';
    this.isForm = !this.isForm;
  }

  create() {
    this.spinner.show();

    this.serviceProviderService.post(this.urlCreate, this.model).subscribe(data => {
      let model: any = {};
      model = data;

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      this.back();
      this.read();
      // setTimeout(() => { this.back(); }, 2000);

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  read() {
    this.spinner.show();

    this.serviceProviderService.post(this.urlRead, {}).subscribe(data => {
      let model: any = {};
      model = data;

      this.models = model.objectData;

      this.spinner.hide();
      // this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      // setTimeout(() => { this.back(); }, 2000);

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  update() {
    this.spinner.show();

    this.serviceProviderService.post(this.urlUpdate, this.model).subscribe(data => {
      let model: any = {};
      model = data;

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      this.back();
      this.read();
      // setTimeout(() => { this.back(); }, 2000);

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  delete() {
    this.spinner.show();

    this.serviceProviderService.post(this.urlDelete, this.models).subscribe(data => {
      let model: any = {};
      model = data;

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      this.read();
      // setTimeout(() => { this.back(); }, 2000);

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  checkAll(param) {
    console.log(param.currentTarget.checked);

    if (param.currentTarget.checked)
    {
      this.models.forEach(element => {
        element.isDelete = true;
      });
    }
    else
    {
      this.models.forEach(element => {
        element.isDelete = false;
      });
    }
  }

  checkChange(param) {
    if (!param.currentTarget.checked)
    {
      this.isChecked = false;
    }
  }

  deleteAll() {}

  exportAsXLSX() {}

  isAllSelected(param, param2) {}

  readCategory(param) {}

  reOrder() {}

  search() {}

  setPerPage(param) {}

  showForm(param:any = { isActive: true }) {

    this.isForm = !this.isForm;
    this.model = param;
    
    if (param.code == undefined)
      this.navigation3 = 'เพิ่ม ' + this.navigation3;
    else
      this.navigation3 = 'แก้ไข ' + this.navigation3;
  }

}
