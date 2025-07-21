import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/shared/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  @Input() messageInput: any = [];
  @Output() messageToEmit = new EventEmitter<any>();
  @Input() paginationModel: any = {}; // <----- Pagination
  @Input() criteriaModel: any = [];
  category: any = {};
  permission: any;
  chkall: boolean = false;
  itemSelectedList: any = [];
  itemSelected: boolean = false;
  searchModel: any = {};

  constructor(
    private router: Router,
    private serviceProviderService: ServiceProviderService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private excelService: ExcelService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

    if (localStorage.getItem('memberPage') != null) {
      this.permission = JSON.parse(localStorage.getItem('memberPage'));
    }

  }

  search() {
    this.searchModel.mode = 'search';
    this.messageToEmit.emit(this.searchModel);
  }
  create() {
    this.router.navigate(['member-edit', ''], { skipLocationChange: true });
  }

  view(param) {
    this.router.navigate(['member-edit', param], { skipLocationChange: true });
  }

  edit(param) {
    this.router.navigate(['member-edit', param], { skipLocationChange: true });
  }

  delete(param, idx) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.serviceProviderService.post('register/delete', { code: param.code }).subscribe(data => {
          this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 2000 });
          this.messageInput.splice(idx, 1);
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
        });
      }
    });
  }

  deleteAll() {
    let model = '';

    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true });

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

        this.serviceProviderService.post('register/delete', { code: model }).subscribe(data => {
          this.toastr.success('ลบรายการเรียบร้อย', 'แจ้งเตือนระบบ', { timeOut: 1000 });
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }, err => {
          this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
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
    var obj = this.criteriaModel;
    obj.keySearch = this.searchModel.keySearch;
    this.serviceProviderService.post('register/report/read', obj).subscribe(data => {
      let model: any = {};
      let result: any = [];
      model = data;
      // this.data = model.objectData; // <----- Pagination
      model.objectData.forEach((e, index) => {

        var statusTitle = '';
        if(e.isActive) statusTitle = 'ตรวจสอบแล้ว';
        else statusTitle = 'รอตรวจสอบ';

        result.push({
          'ลำดับ': index + 1,
          'สถานะ': statusTitle,
          'ชื่อผู้ใช้': e.username,
          'ชื่อ': e.firstName,
          'นามสกุล': e.lastName,
          'ตำแหน่ง': e.category,
          'ระดับ 0': e.titleLv0,
          'ระดับ 1': e.titleLv1,
          'ระดับ 2': e.titleLv2,
          'ระดับ 3': e.titleLv3,
          'ระดับ 4': e.titleLv4,
          'ระดับ 5': e.titleLv5,
          'cpTitle': e.cpTitle,
          'profileCode': e.code,
          'lv0': e.lv0,
          'lv1': e.lv1,
          'lv2': e.lv2,
          'lv3': e.lv3,
          'lv4': e.lv4,
          'lv5': e.lv5,
        })
      });

      this.excelService.exportAsExcelFile(result, 'รายงานผู้ดูแลระบบ');
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
