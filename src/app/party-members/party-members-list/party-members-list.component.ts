import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/shared/excel.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-party-members-list',
  templateUrl: './party-members-list.component.html',
  styleUrls: ['./party-members-list.component.css']
})
export class PartyMembersListComponent implements OnInit {

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

  constructor(private router: Router
            , private serviceProviderService: ServiceProviderService
            , public dialog: MatDialog
            , private toastr: ToastrService
            , private excelService: ExcelService
            , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }
  }

  search() {
    this.searchModel.mode = 'search';
    this.messageToEmit.emit(this.searchModel);
  }

  create() {
    this.router.navigate(['party-members-edit', ''], { skipLocationChange: true });
  }

  view(param) {
    this.router.navigate(['party-members-edit', param], { skipLocationChange: true });
  }

  edit(param) {
    this.router.navigate(['party-members-edit', param], { skipLocationChange: true });
  }

  delete(param, idx) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        this.serviceProviderService.post('register/member/delete', { code: param.code }).subscribe(data => {
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
        this.itemSelectedList.forEach(c => {
          if (model == '') {
            model = c.code;
          }
          else {
            model = model + ',' + c.code;
          }
        })

        this.serviceProviderService.post('register/member/delete', { code: model }).subscribe(data => {
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

  // checkPermission(param, param2) {

  //   if (param2 == 'updateAction') {
  //     let model = this.permission.filter(c => c.title == param);
  //     if (model.length > 0) {
  //       return model[0].updateAction;
  //     }
  //   }
  //   else if (param2 == 'readAction') {
  //     let model = this.permission.filter(c => c.title == param);
  //     if (model.length > 0) {
  //       return model[0].readAction;
  //     }
  //   }
  //   else if (param2 == 'deleteAction') {
  //     let model = this.permission.filter(c => c.title == param);
  //     if (model.length > 0) {
  //       return model[0].deleteAction;
  //     }
  //   }
  // }

  // start select user
  async isAllSelected(param, param2) {
    if (this.category.deleteAction) {
      this.itemSelected = await this.messageInput.every(function (item: any) {
        return item.isSelected == true;
      })
    }
    this.getCheckedItemList();
  }

  async checkUncheckAll() {
    if (this.category.deleteAction) {
      for (var i = 0; i < this.messageInput.length; i++) {

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
    // {'skip':0,'limit':999999}
    var obj = this.criteriaModel;
    obj.keySearch = this.searchModel.keySearch;
    this.serviceProviderService.post('register/report/member/read', obj).subscribe(data => {
      let model: any = {};
      let result: any = [];
      model = data;
      // this.data = model.objectData; // <----- Pagination
      model.objectData.forEach((e, index) => {

        var statusTitle = '';
        if(e.status == 'A') statusTitle = 'ตรวจสอบเรียบร้อยแล้ว';
        else if(e.status == 'N') statusTitle = 'รอการยืนยันตัวตน';
        else if(e.status == 'V') statusTitle = 'รอการตรวจสอบ';
        else if(e.status == 'R') statusTitle = 'รอการตรวจสอบ';
        else if(e.status == 'J') statusTitle = 'ยืนยันตนไม่สำเร็จ';

        result.push({
          'ลำดับ': e.order,
          'สถานะ': e.statusTitle,
          'ชื่อผู้ใช้': e.username,
          'ชื่อ': e.firstName,
          'นามสกุล': e.lastName,
          'เข้าสู่ระบบโดย': e.category,
          'วันที่สมัคร': moment(e.createDate, 'YYYYMMDDhhmmss').format('DD-MM-YYYY'),
          'วัน': e.createDate != "" ? e.createDate.substring(6, 8) : "",
          'เดือน': e.createDate != "" ? e.createDate.substring(4, 6) : "",
          'ปี': e.createDate != "" ? e.createDate.substring(0, 4) : "",
          'ระดับ 0': e.titleLv0,
          'ระดับ 1': e.titleLv1,
          'ระดับ 2': e.titleLv2,
          'ระดับ 3': e.titleLv3,
          'ระดับ 4': e.titleLv4,
          'ระดับ 5': e.titleLv5,
          'cpTitle': e.cpTitle,
          'profileCode': e.code,
          'statusCode': e.status,
          'lv0': e.lv0,
          'lv1': e.lv1,
          'lv2': e.lv2,
          'lv3': e.lv3,
          'lv4': e.lv4,
          'lv5': e.lv5,
        })
      });

      this.excelService.exportAsExcelFile(result, 'รายงานผู้ใช้');
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
