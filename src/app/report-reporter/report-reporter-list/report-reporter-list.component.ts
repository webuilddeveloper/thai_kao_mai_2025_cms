import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/shared/excel.service';
import { DateFormatPipe } from 'src/app/date-format.pipe';

@Component({
  selector: 'app-report-reporter-list',
  templateUrl: './report-reporter-list.component.html',
  styleUrls: ['./report-reporter-list.component.css']
})
export class ReportReporterListComponent implements OnInit {

  @Input() messageInput: any = [];
  @Output() messageToEmit = new EventEmitter<any>();
  @Input() paginationModel: any = {}; // <----- Pagination
  @Input() criteriaModel: any = {};
  category: any = {};
  permission: any;
  chkall: boolean = false;
  itemSelectedList: any = [];
  itemSelected: boolean = false;
  searchModel: any = {};

  constructor(private router: Router,
    private serviceProviderService: ServiceProviderService,
    private excelService: ExcelService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

    if (localStorage.getItem('reporterPage') != null) {
      this.permission = JSON.parse(localStorage.getItem('reporterPage'));
    }

  }

  test() {
    console.log('criteria model ::: ', this.criteriaModel);
  }

  search() {
    this.searchModel.mode = 'search';
    this.messageToEmit.emit(this.searchModel);
  }

  setPerPage(param) {
    this.searchModel.mode = 'search';
    this.searchModel.limit = parseInt(param);
    this.messageToEmit.emit(this.searchModel);
  }

  exportAsXLSX(): void {
    this.criteriaModel.skip = 0;
    this.criteriaModel.limit = 999999;
    this.criteriaModel.page = 'reporter'
    this.serviceProviderService.postStatisticsV2('read', this.criteriaModel).subscribe(data => {
      let model: any = {};
      let result: any = [];
      model = data;
      // this.data = model.objectData; // <----- Pagination
      model.objectData.forEach((e, index) => {

        result.push({
          'ลำดับ': index + 1,
          // 'ความถี่':e.reach,
          'หัวข้อ': e.title,
          'ประเภท': e.category,
          // 'จำนวน':e.totalCount,
          'จำนวน': e.view,
          'วันที่สร้าง': DateFormatPipe.transform(e.createDate),
          // 'นาทีเฉลี่ย':e.minute,
          // 'Admin ผู้สร้างข่าว':e.createBy,
        })
      });

      this.excelService.exportAsExcelFile(result, 'รายงานยอดอ่าน ร้องเรียน');
    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }
}
