import { Component, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordionDisplayMode } from '@angular/material/expansion';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';

@Component({
  selector: 'app-portfolio-criteria',
  templateUrl: './portfolio-criteria.component.html',
  styleUrls: ['./portfolio-criteria.component.css']
})
export class PortfolioCriteriaComponent implements OnInit {

  @Input() displayMode: MatAccordionDisplayMode
    @Input() hideToggle: boolean
    @Input() criteriaModel: any = {};;
    @Output() messageToEmit = new EventEmitter<any>();
    isAdvanceSearch: boolean = true;
    listSequence: any = [];
    listCategory: any = [{ value: '', display: 'ทั้งหมด' }];
    listCenter: any = [{ value: '', display: 'ทั้งหมด' }];
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
  
      if (localStorage.getItem('portfolioPage') != null) {
        let model: any = [];
        model = JSON.parse(localStorage.getItem('portfolioPage'));
  
        for (let index = 0; index < model.length; index++) {
          if (index == 0)
            this.permission = model[index].title;
          else
            this.permission = this.permission + "," + model[index].title;
        }
      }
  
      this.readCategory();
      this.readCenter();
      this.readSequence();
      this.search()
  
      this.paginationModelDiffer = this.differs.find(this.paginationModel).create(); // <----- Pagination
    }
  
    readCenter() {
      this.criteriaModel.permission = this.permission;
      this.serviceProviderService.post('center/read', this.criteriaModel).subscribe(data => {
        let model: any = {};
        model = data;
        this.listCenter = [{ value: '', display: 'ทั้งหมด' }];
        model.objectData.forEach(element => {
          if(element.code == '') element.code = '000';
          this.listCenter.push({ value: element.code, display: element.title });
        });
      }, err => { });
    }
  
    search() {
      this.spinner.show();
      this.criteriaModel.limit = 5;
      this.criteriaModel.skip = 0;
      this.messageToEmit.emit(this.criteriaModel); // <----- Pagination
    }
  
    advance() {
      this.isAdvanceSearch = !this.isAdvanceSearch;
      this.criteriaModel.keySearch = '';
      this.criteriaModel.limit = 5;
      this.criteriaModel.skip = 0;
    }
  
    readSequence() {
      this.criteriaModel.permission = this.permission;
      this.serviceProviderService.post('groupby/read', { permission: this.permission, title: 'portfolio' }).subscribe(data => {
        let model: any = {};
        model = data;
        this.listSequence = model.objectData;
        this.listSequence.splice(0, 0, { value: '', display: 'ทั้งหมด' });
      }, err => { });
    }
  
    readCategory() {
      this.criteriaModel.permission = this.permission;
      this.serviceProviderService.post('portfolio/category/read', this.criteriaModel).subscribe(data => {
        let model: any = {};
        model = data;
        this.listCategory = [{ value: '', display: 'ทั้งหมด' }];
        model.objectData.forEach(element => {
          this.listCategory.push({ value: element.code, display: element.title });
        });
      }, err => { });
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
      this.criteriaModel.center = 'all';
  
      // this.read();
    }

}
