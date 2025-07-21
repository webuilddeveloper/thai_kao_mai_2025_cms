import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatAccordionDisplayMode } from '@angular/material/expansion';

@Component({
  selector: 'app-report-news-criteria',
  templateUrl: './report-news-criteria.component.html',
  styleUrls: ['./report-news-criteria.component.css']
})
export class ReportNewsCriteriaComponent implements OnInit {

  @Input() displayMode: MatAccordionDisplayMode
  @Input() hideToggle: boolean
  @Input() criteriaModel: any = {};;
  @Output() messageToEmit = new EventEmitter<any>();
  isAdvanceSearch: boolean = true;
  listSequence: any = [];
  listCategory: any = [{ value: '', display: 'ทั้งหมด' }];
  permission: any;
  @Input() paginationModel: any = {}; // <----- Pagination
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination

  // @Input() title;
  // @Input() description;
  // @Input() isActive;


  public dateTimeControl = new FormControl(moment());
  public dateControl = new FormControl(moment());

  constructor(private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService, private differs: KeyValueDiffers) { }

  ngOnInit(): void {
    this.readCategory();
    this.search()
    this.paginationModelDiffer = this.differs.find(this.paginationModel).create(); // <----- Pagination
  }

  search() {
    this.spinner.show();
    this.messageToEmit.emit(this.criteriaModel); // <----- Pagination
  }

  readCategory() {

    this.criteriaModel.permission = this.permission;

    this.criteriaModel.page = 'news';
    this.criteriaModel.isCategory = true;
    this.serviceProviderService.postStatisticsV2('read', this.criteriaModel).subscribe(data => {
      this.criteriaModel.isCategory = false;
      let model: any = {};
      model = data;
      this.listCategory = [{ value: '', display: 'ทั้งหมด' }];
      model.objectData.forEach(element => {
        this.listCategory.push({ value: element.title, display: element.title });
      });
    }, err => { });
  }


  advance() {
    this.isAdvanceSearch = !this.isAdvanceSearch;
    this.criteriaModel.keySearch = '';
  }

  displayDate(param) {
    return moment(param).format('YYYYMMDD');
  }

  displayDateTime(param) {
    return moment(param).format('YYYYMMDDhhmmss');
  }

  reset() {
    this.criteriaModel.title = '';
    this.criteriaModel.sequence = '';
    this.criteriaModel.category = '';
    this.criteriaModel.startDate = '';
    this.criteriaModel.endDate = '';
    this.criteriaModel.status = '';
    this.criteriaModel.createBy = '';
    // this.read();
  }

}
