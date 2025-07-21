import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceProviderService } from './../shared/service-provider.service';
import { Component, OnInit, Input, Output, EventEmitter, KeyValueDiffer, KeyValueDiffers, KeyValueChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {
  model: any = [];
  listModel: string = '';
  isAdvanceSearch: boolean = true;
  listCategory: any = [{ value: '', display: 'ทั้งหมด' }];
  permission: any;
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination
  paginationModel: any = { itemsPerPage: 5, currentPage: 1, totalItems: 0, itemsPerPageString: '5' }; // <----- Pagination
  criteriaModel: any = {}

  constructor(public dialog: MatDialog, private serviceProviderService: ServiceProviderService, private spinner: NgxSpinnerService, private toastr: ToastrService, private differs: KeyValueDiffers) { }

  ngOnInit(): void {

    if (localStorage.getItem('newsCategoryPage') != null) {
      let model: any = [];
      model = JSON.parse(localStorage.getItem('newsCategoryPage'));

      for (let index = 0; index < model.length; index++) {
        if (index == 0)
          this.permission = model[index].title;
        else
          this.permission = this.permission + "," + model[index].title;        
      }
    }

    this.paginationModelDiffer = this.differs.find(this.paginationModel).create(); // <----- Pagination
  }

  read() {
    this.spinner.show();
    
    this.criteriaModel.permission = 'all';

    this.serviceProviderService.post('news/category/read', this.criteriaModel).subscribe(data => {
      setTimeout(() => {
        let model: any = {};
        model = data;
        this.model = JSON.stringify(model.objectData); // <----- Pagination
        this.listModel = model.objectData; // <----- Pagination
        this.paginationModel.totalItems = model.totalData; // <----- Pagination
        this.paginationModel.itemsPerPage = this.criteriaModel.limit;
        this.paginationModel.itemsPerPageString = this.paginationModel.itemsPerPage.toString();
        
        if ((this.criteriaModel.skip + this.paginationModel.itemsPerPage) > this.paginationModel.totalItems)
          this.paginationModel.textPage = this.paginationModel.totalItems != 0 ? 'แสดง ' + (this.criteriaModel.skip + 1) + ' ถึง ' + this.paginationModel.totalItems + ' จาก ' + this.paginationModel.totalItems + ' แถว' : 'แสดง 0 ถึง 0 จาก 0 แถว' ;
        else
          this.paginationModel.textPage = 'แสดง ' + (this.criteriaModel.skip + 1) + ' ถึง ' + (this.criteriaModel.skip + this.paginationModel.itemsPerPage) + ' จาก ' + this.paginationModel.totalItems + ' แถว';
        
        this.spinner.hide();
      }, 500);
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  async getMessageCriteria(message: any) {
    this.criteriaModel = message;
    await this.read();
  }

  getMessageList(message: any) {
    if (message.mode == 'view') {
      // this.criteriaHide = true;
      // this.listHide = true;
      // this.viewHide = false;
    }
    else if (message.mode == 'edit') {
      // this.criteriaHide = true;
      // this.listHide = true;
      // this.editHide = false;
    }else if(message.mode == 'search'){
      this.criteriaModel.limit = message.limit;
      this.criteriaModel.keySearch = message.keySearch;
      this.criteriaModel.skip = 0;
      this.paginationModel.currentPage = 1;
      this.paginationModel.itemsPerPage = message.limit;
      this.read();
    }
  }
  
  // <----- Pagination
  paginationModelChanged(changes: KeyValueChanges<string, any>) {
    // console.log('changes');
    
    this.criteriaModel.skip = this.paginationModel.currentPage == 1 ? 0 : (this.paginationModel.currentPage * this.paginationModel.itemsPerPage) - this.paginationModel.itemsPerPage; // <----- Pagination
    this.criteriaModel.limit = this.paginationModel.itemsPerPage; // <----- Pagination
    this.criteriaModel.permission = this.permission; 

    this.read();
    /* If you want to see details then use
      changes.forEachRemovedItem((record) => ...);
      changes.forEachAddedItem((record) => ...);
      changes.forEachChangedItem((record) => ...);
    */
  }

  // <----- Pagination 
  ngDoCheck(): void {

      const changes = this.paginationModelDiffer.diff(this.paginationModel);
      if (changes) {
        this.paginationModelChanged(changes);
      }
  }

}
