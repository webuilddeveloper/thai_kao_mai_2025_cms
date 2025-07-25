import { Component, KeyValueDiffer, OnInit, ViewEncapsulation } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  listPage: any = [];
  editModel: any = {};
  code: string = '';
  category: any = {};
  ideology: string = '';
  ideologyEN: string = '';
  ideologyDes: string = '';
  ideologyDesEN: string = '';
  messageInput: any = [];
  messageInputSlice: any = [];
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination
  paginationModel: any = { itemsPerPage: 5, currentPage: 1, totalItems: 0, itemsPerPageString: '5' }; // <----- Pagination


  constructor(private fileuploadService: FileUploadService
    , private serviceProviderService: ServiceProviderService
    , private spinner: NgxSpinnerService
    , private toastr: ToastrService
    , private router: Router
    , private activetedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.read();
  }

  create() {
    let isValid = false;
    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่ชื่อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image != undefined) {
      if (this.editModel.image.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพโลโก้', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (this.editModel.imageBg != undefined) {
      if (this.editModel.imageBg.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพพื้นหลัง', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (isValid)
      return;

    if (this.editModel.image != undefined)
      this.editModel.imageLogoUrl = this.editModel.image[0].imageUrl;

    if (this.editModel.imageBg != undefined)
      this.editModel.imageBgUrl = this.editModel.imageBg[0].imageUrl;

    this.editModel.ideologyList = this.messageInputSlice;

    this.spinner.show();
    this.serviceProviderService.post('aboutUs/create', this.editModel).subscribe(data => {
      let model: any = {}
      model = data;
      if (model.status === 'S') {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
        // setTimeout(() => {
        //   this.spinner.show();
        //   window.location.reload();
        // },1000)

      } else {
        this.spinner.hide();
        this.toastr.error(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  read() {
    this.spinner.show();
    this.editModel.code = localStorage.getItem('userCode');
    this.serviceProviderService.post('aboutUs/read', { code: this.editModel.code }).subscribe(data => {
      let model: any = {};
      model = data;

      if (model.objectData.length > 0) {
        this.editModel = model.objectData[0];
        this.code = this.editModel.code;
        this.messageInputSlice = model.objectData[0].ideologyList;
      }

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  update() {
    let isValid = false;
    if (this.editModel.title == '') {
      this.toastr.warning('กรุณาใส่ชื่อ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.editModel.image != undefined) {
      if (this.editModel.image.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพโลโก้', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (this.editModel.imageBg != undefined) {
      if (this.editModel.imageBg.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพพื้นหลัง', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (isValid)
      return;

    if (this.editModel.image != undefined) {
      this.editModel.imageLogoUrl = this.editModel.image[0].imageUrl;
    }

    if (this.editModel.imageBg != undefined) {
      this.editModel.imageBgUrl = this.editModel.imageBg[0].imageUrl;
    }

    this.editModel.ideologyList = this.messageInputSlice;

    this.spinner.show();
    this.serviceProviderService.post('aboutUs/update', this.editModel).subscribe(data => {
      let model: any = {}
      model = data;
      if (model.status === 'S') {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        // setTimeout(() => {
        //   this.spinner.show();
        //   window.location.reload();
        // },1000)
      } else {
        this.spinner.hide();
        this.toastr.error(model.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
      }
    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  setPerPage(param) {
    this.paginationModel.currentPage = 1;
    this.paginationModel.itemsPerPage = parseInt(param); // <----- Pagination
    this.setLocalTable(this.paginationModel.currentPage - 1, this.paginationModel.itemsPerPage)
  }

  deleteItem(param) {
    this.messageInputSlice.splice(param + (this.paginationModel.itemsPerPage * (this.paginationModel.currentPage - 1)), 1);
    this.messageInput.splice(param + (this.paginationModel.itemsPerPage * (this.paginationModel.currentPage - 1)), 1);
    this.setLocalTable((this.paginationModel.currentPage - 1) * this.paginationModel.itemsPerPage, this.paginationModel.itemsPerPage + (this.paginationModel.currentPage - 1) * this.paginationModel.itemsPerPage);
  }

  setLocalTable(skip, limit) {
    this.messageInputSlice = this.messageInput.slice(skip, limit);
    this.paginationModel.totalItems = this.messageInput.length - 1;

    if ((skip + this.paginationModel.itemsPerPage) > this.paginationModel.totalItems)
      this.paginationModel.textPage = this.paginationModel.totalItems != 0 ? 'แสดง ' + (skip + 1) + ' ถึง ' + this.paginationModel.totalItems + ' จาก ' + this.paginationModel.totalItems + ' แถว' : 'แสดง 0 ถึง 0 จาก 0 แถว';
    else
      this.paginationModel.textPage = 'แสดง ' + (skip + 1) + ' ถึง ' + (skip + this.paginationModel.itemsPerPage) + ' จาก ' + this.paginationModel.totalItems + ' แถว';

  }

  addIdeology() {
    let isValid = false;
    if (this.ideology == '') {
      this.toastr.warning('กรุณาใส่อุดมการณ์', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.ideologyEN == '') {
      this.toastr.warning('กรุณาใส่อุดมการณ์ (ภาษาอังกฤษ)', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.ideologyDes == '') {
      this.toastr.warning('กรุณาใส่รายละเอียดอุดมการณ์', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }

    if (this.ideologyDesEN == '') {
      this.toastr.warning('กรุณาใส่รายละเอียดอุดมการณ์ (ภาษาอังกฤษ)', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      isValid = true;
    }


    if (isValid)
      return;

    let model = {
      title: this.ideology,
      titleEN: this.ideologyEN,
      description: this.ideologyDes,
      descriptionEN: this.ideologyDesEN
    };
    this.messageInputSlice.push(model)

    this.ideology = "";
    this.ideologyEN = "";
    this.ideologyDes = "";
    this.ideologyDesEN = "";
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.messageInputSlice, event.previousIndex, event.currentIndex);
  }

}
