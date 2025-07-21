import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatAccordionDisplayMode } from '@angular/material/expansion';

@Component({
  selector: 'app-member-mobile-criteria',
  templateUrl: './member-mobile-criteria.component.html',
  styleUrls: ['./member-mobile-criteria.component.css']
})
export class MemberMobileCriteriaComponent implements OnInit {

  @Input() displayMode: MatAccordionDisplayMode
  @Input() hideToggle: boolean
  @Input() criteriaModel: any = {};;
  @Output() messageToEmit = new EventEmitter<any>();
  isAdvanceSearch: boolean = true;
  listCategory: any = [{ value: '', display: 'ทั้งหมด' }];
  permission: any;
  @Input() paginationModel: any = {}; // <----- Pagination
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination

  // @Input() title;
  // @Input() description;
  // @Input() isActive;


  public dateTimeControl = new FormControl(moment());
  public dateControl = new FormControl(moment());


  constructor(private serviceProviderService: ServiceProviderService
            , private spinner: NgxSpinnerService
            , private toastr: ToastrService
            , private differs: KeyValueDiffers) { }


  ngOnInit(): void {
    this.listCategory = [
      {value: '', display: 'ทั้งหมด'},
      {value: 'guest', display: 'guest'},
      {value: 'facebook', display: 'facebook'},
      {value: 'google', display: 'google'},
      {value: 'line', display: 'line'},
      {value: 'apple', display: 'apple'},
    ]

    // if (localStorage.getItem('newsPage') != null) {
    //   let model: any = [];
    //   model = JSON.parse(localStorage.getItem('newsPage'));

    //   for (let index = 0; index < model.length; index++) {
    //     if (index == 0)
    //       this.permission = model[index].title;
    //     else
    //       this.permission = this.permission + "," + model[index].title;
    //   }
    // }

    // this.readCategory();
    // this.read();
    this.search()

    this.paginationModelDiffer = this.differs.find(this.paginationModel).create(); // <----- Pagination
  }

  search() {
    this.spinner.show();
    this.messageToEmit.emit(this.criteriaModel); // <----- Pagination
  }

  // readCategory() {

  //   this.criteriaModel.permission = this.permission;

  //   this.serviceProviderService.post('register/category/read', this.criteriaModel).subscribe(data => {
  //     let model: any = {};
  //     model = data;
  //     this.listCategory = [];
  //     model.objectData.forEach(element => {
  //       this.listCategory.push({value: element.code, display: element.title});
  //     });
  //   }, err => { });
  // }

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
