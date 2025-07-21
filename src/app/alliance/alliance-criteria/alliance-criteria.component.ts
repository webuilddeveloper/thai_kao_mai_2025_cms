import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordionDisplayMode } from '@angular/material/expansion';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-alliance-criteria',
  templateUrl: './alliance-criteria.component.html',
  styleUrls: ['./alliance-criteria.component.css']
})
export class AllianceCriteriaComponent implements OnInit {

  @Input() displayMode: MatAccordionDisplayMode
  @Input() hideToggle: boolean
  @Input() criteriaModel: any = {};;
  @Output() messageToEmit = new EventEmitter<any>();
  isAdvanceSearch: boolean = true;
  listSequence: any = [];
  permission: any;
  @Input() paginationModel: any = {}; // <----- Pagination
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination

  // @Input() title;
  // @Input() description;
  // @Input() isActive;

  
  public dateTimeControl = new FormControl(moment());
  public dateControl = new FormControl(moment());

  constructor(private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService,  private toastr: ToastrService, private differs: KeyValueDiffers) { }

  ngOnInit(): void {

    if (localStorage.getItem('bannerPage') != null) {
      let model: any = [];
      model = JSON.parse(localStorage.getItem('bannerPage'));

      for (let index = 0; index < model.length; index++) {
        if (index == 0)
          this.permission = model[index].title;
        else
          this.permission = this.permission + "," + model[index].title;        
      }
    }

    this.readSequence();
    this.search()

    this.paginationModelDiffer = this.differs.find(this.paginationModel).create(); // <----- Pagination
  }

  search() {
    this.spinner.show();
    this.messageToEmit.emit(this.criteriaModel); // <----- Pagination
  }

  readSequence() {
    this.criteriaModel.permission = this.permission;
    this.serviceProviderService.post('groupby/read', { permission: this.permission,title: 'banner' }).subscribe(data => {
      let model: any = {};
      model = data;
      this.listSequence = model.objectData;
      this.listSequence.splice(0,0,{ value: '', display: 'ทั้งหมด' });
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
