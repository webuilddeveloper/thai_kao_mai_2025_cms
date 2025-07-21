import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/shared/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatetimeFormatPipe } from 'src/app/datetime-format.pipe';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  @Input() messageInput: any = [];
  @Output() messageToEmit = new EventEmitter<any>();
  @Input() paginationModel: any = {}; // <----- Pagination
  @Input() criteriaModel: any = [];
  category: any = {};
  permission: any;
  permissionStr: any;
  chkall: boolean = false;
  itemSelectedList: any = [];
  itemSelected: boolean = false;
  searchModel: any = {};

  constructor(private router: Router, private serviceProviderService: ServiceProviderService, private excelService: ExcelService, public dialog: MatDialog, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

    if (localStorage.getItem('newsPage') != null) {
      let model: any = [];
      this.permission = JSON.parse(localStorage.getItem('newsPage'));


      // convert permission list to string
      for (let index = 0; index < this.permission.length; index++) {
        if (index == 0)
          this.permissionStr = this.permission[index].title;
        else
          this.permissionStr = this.permissionStr + "," + this.permission[index].title;
      }
    }

  }

  search() {
    this.searchModel.mode = 'search';
    this.messageToEmit.emit(this.searchModel);
  }

  create() {
    this.router.navigate(['news-edit', ''], { skipLocationChange: true });
  }

  view(param) {
    this.router.navigate(['news-edit', param], { skipLocationChange: true });
  }

  edit(param) {
    this.router.navigate(['news-edit', param], { skipLocationChange: true });
  }

  delete(param, idx) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.serviceProviderService.post('news/delete', { code: param.code }).subscribe(data => {
          this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
          this.messageInput.splice(idx, 1);
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        });
      }
    });
  }

  reOrder() {
    let model = '';
    let chk = this.messageInput.filter(c => c.isSelected);

    if (chk.length == 0) {
      this.toastr.warning('กรุณาเลือกรายการที่ต้องการ Re Order', 'แจ้งเตือนระบบ', { timeOut: 2000 });
      return;
    } 

    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true, data: { title: "ต้องการ Re Order รายการที่เลือกใช่หรือไม่?" } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // check permission
        let chk = this.messageInput.filter(c => c.isSelected);

        chk.forEach(c => {
          // this.checkPermission(c.category, 'deleteAction');
          if (model == '') {
            model = c.code;
          }
          else {
            model = model + ',' + c.code;
          }
        })

        this.serviceProviderService.post('news/reorder', { code: model }).subscribe(data => {
          this.toastr.success('Re Order เรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        });
      }
    });
  }

  reOrderAll() {
    let model = '';
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true, data: { title: "ต้องการ Re Order ทั้งหมด ใช่หรือไม่?" } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.serviceProviderService.post('news/reorderAll', { code: model }).subscribe(data => {
          this.toastr.success('Re Order เรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        });
      }
    });
  }

  deleteAll() {
    let model = '';

    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true, data: { title: "ต้องการลบรายการที่เลือกใช่หรือไม่?" } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // check permission

        let chk = this.messageInput.filter(c => c.isSelected);

        chk.forEach(c => {
          // this.checkPermission(c.category, 'deleteAction');
          if (model == '') {
            model = c.code;
          }
          else {
            model = model + ',' + c.code;
          }
        })

        this.serviceProviderService.post('news/delete', { code: model }).subscribe(data => {
          this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        });
      }
    });
  }

  checkPermission(param, param2) {

    if (param2 == 'updateAction') {
      let model = this.permission.filter(c => c.title == param);
      if (model.length > 0) {
        return model[0].updateAction;
      }
    }
    else if (param2 == 'readAction') {
      let model = this.permission.filter(c => c.title == param);
      if (model.length > 0) {
        return model[0].readAction;
      }
    }
    else if (param2 == 'deleteAction') {
      let model = this.permission.filter(c => c.title == param);
      if (model.length > 0) {
        return model[0].deleteAction;
      }
    }

  }

  // start select user
  async isAllSelected(param, param2) {
    let status = await this.checkPermission(param, param2)
    if (status) {
      this.itemSelected = await this.messageInput.every(function (item: any) {
        return item.isSelected == true;
      })
    }
    this.getCheckedItemList();
  }

  async checkUncheckAll() {
    for (var i = 0; i < this.messageInput.length; i++) {
      let status = await this.checkPermission(this.messageInput[i].category, 'deleteAction');

      if (status) {
        this.messageInput[i].isSelected = this.itemSelected;
      }
    }
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.itemSelectedList = [];
    for (var i = 0; i < this.messageInput.length; i++) {
      if (this.messageInput[i].isSelected)
        this.itemSelectedList.push(this.messageInput[i]);
    }
  }
  // end select uxs

  filterPerPage(perPage) {
    // call read by perpage
  }

  setPerPage(param) {
    this.searchModel.mode = 'search';
    this.searchModel.limit = parseInt(param);
    this.messageToEmit.emit(this.searchModel);
  }

  exportAsXLSX(): void {

    this.spinner.show();
    // { 'skip': 0, 'limit': 999999, 'permission': this.permissionStr }
    var obj = this.criteriaModel;
    obj.permission = this.permissionStr;
    obj.keySearch = this.searchModel.keySearch;
    this.serviceProviderService.post('news/report/read', obj).subscribe(data => {
      let model: any = {};
      let result: any = [];
      model = data;
      // this.data = model.objectData; // <----- Pagination
      model.objectData.forEach((e, index) => {

        var status = ''
        if (e.isActive)
          status = 'ตรวจสอบแล้ว';
        else
          status = 'รอตรวจสอบ';


        result.push({
          'ลำดับ': index + 1,
          'หัวข้อ': e.title,
          'หมวดหมู่': e.category,
          'สร้างโดย': e.createBy,
          'สร้างวันที่': DatetimeFormatPipe.transform(e.createDate),
          'อัพเดทโดย': e.updateBy,
          'อัพเดทวันที่': DatetimeFormatPipe.transform(e.updateDate),
          'สถานะ': status,
          'center': e.center,
        })
      });

      this.excelService.exportAsExcelFile(result, 'รายงานข่าวประชาสัมพันธ์');
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }
}

@Component({
  selector: 'confirm-delete-dialog',
  templateUrl: 'confirm-delete-dialog.html',
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  cancel() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(true);
  }
}
