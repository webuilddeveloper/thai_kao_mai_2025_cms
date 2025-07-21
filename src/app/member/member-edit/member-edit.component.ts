import { Component, OnInit, ViewEncapsulation, KeyValueChanges, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { FileUploadService } from 'src/app/shared/file-upload.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  Editor = ClassicEditor;
  listCategory: any = [];
  listCenter:any = [];
  editModel: any = {};
  code: any;
  title = 'เพิ่มข้อมูล';
  listPrefixName: any = [];
  category: any;
  messageInput: any = [];
  isSaveSuccess: boolean = false;
  allSelected: boolean = false;
  isShow: string = '1';

  keySearch: string = '';
  categoryCriteria: any = {};
  userSearchGender: string = '';

  categoryPaginationDiffer: KeyValueDiffer<string, any>; // <----- Pagination

  categoryPagination: any = { itemsPerPage: 10, currentPage: 1, totalItems: 0 };

  constructor(private fileuploadService: FileUploadService
    , private serviceProviderService: ServiceProviderService
    , private spinner: NgxSpinnerService
    , private differs: KeyValueDiffers
    , private toastr: ToastrService
    , private router: Router
    , private activetedRoute: ActivatedRoute) {

    this.listPrefixName = [
      {
        value: 'นาย',
        display: 'นาย'
      },
      {
        value: 'นาง',
        display: 'นาง'
      },
      {
        value: 'นางสาว',
        display: 'นางสาว'
      }
    ];
  }

  ngOnInit(): void {
    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      if (this.code != '') {
        this.title = 'แก้ไขข้อมูล';
        this.read();
      }

      this.readCenter();

    });

    if (localStorage.getItem('category') != null) {
      this.category = JSON.parse(localStorage.getItem('category'));
    }

    this.categoryPaginationDiffer = this.differs.find(this.categoryPagination).create(); // <----- Pagination
  }

  create() {

    let isValid = false;
    // if (this.editModel.title == '') {
    //   this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
    //   isValid = true;
    // }
    // if (this.editModel.center == '') {
    //   this.toastr.warning('กรุณาเลือกศูนย์', 'แจ้งเตือนระบบ', { timeOut: 1000 });
    //   isValid = true;
    // }

    if (this.editModel.image.length == 0) {
      this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      isValid = true;
    }

    if (isValid)
      return;

    this.isSaveSuccess = true;
    this.spinner.show();
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    this.serviceProviderService.post('register/create', this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      if (model.status === 'S') {
        this.messageInput.forEach(element => {
          element.username = this.editModel.username;
          this.serviceProviderService.post('register/role/create', element).subscribe(data => { }, err => { });
        });

        this.spinner.hide();
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

        setTimeout(() => {
          this.back();
        }, 1000);
      }
      else {
      this.isSaveSuccess = false;
      this.spinner.hide();
        this.toastr.warning(model.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
      }
    }, err => {
      this.isSaveSuccess = false;
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  test() {
    console.log('message', this.messageInput);

  }

  read() {
    this.serviceProviderService.post('register/read', { code: this.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel = model.objectData[0];

      this.spinner.hide();
      this.serviceProviderService.post('register/role/read', { username: this.editModel.username }).subscribe(data => {
        let item: any;
        item = data;
        this.messageInput = item.objectData;
      }, err => { });

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  readCenter() {
    this.serviceProviderService.post('center/read', {}).subscribe(data => {
      let model: any = {};
      model = data;
      // this.listCenter = [{ value: '', display: 'สำนักงานแพทยสภา' }];
      model.objectData.sort((n1, n2) => n1.code - n2.code).forEach(element => {
        this.listCenter.push({ value: element.code, display: element.title });
      });
    }, err => { });
  }

  update() {

    let isValid = false;
    // if (this.editModel.title == '') {
    //   this.toastr.warning('กรุณาใส่หัวข้อ', 'แจ้งเตือนระบบ', { timeOut: 1000 });
    //   isValid = true;
    // }

    // if (this.editModel.center == '') {
    //   this.toastr.warning('กรุณาเลือกศูนย์', 'แจ้งเตือนระบบ', { timeOut: 1000 });
    //   isValid = true;
    // }

    if (this.editModel.image != undefined)
    {
      if (this.editModel.image.length == 0) {
        this.toastr.warning('กรุณาใส่รูปภาพ', 'แจ้งเตือนระบบ', { timeOut: 2000 });
        isValid = true;
      }
    }

    if (isValid) {
      return;
    }

    if (this.editModel.image !== undefined) {
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    }

    this.isSaveSuccess = true;
    this.spinner.show();
    this.serviceProviderService.post('register/update', this.editModel).subscribe(data => {

      this.serviceProviderService.post('register/role/delete', this.editModel).subscribe(data => {
        if (this.messageInput.length > 0) {
          this.messageInput.forEach(element => {
            element.username = this.editModel.username;
            this.serviceProviderService.post('register/role/create', element).subscribe(data => { }, err => { });
          });
        }
      }, err => { });

      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      setTimeout(() => {
        this.back();
      }, 1000);

    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  readCategory() {
    this.categoryCriteria.limit = this.categoryCriteria.limit | 10;
    this.isShow = '2';
    this.spinner.show();
    this.serviceProviderService.post('register/category/read', this.categoryCriteria).subscribe(data => {
      // this.messageInput = [];
      // this.allSelected = false;
      let model: any = {};
      model = data;
      this.categoryPagination.totalItems = model.totalData; // <----- Pagination
      this.categoryPagination.itemsPerPage = this.categoryCriteria.limit;
      this.categoryPagination.itemsPerPageString = this.categoryCriteria.limit.toString();
      this.categoryPagination.textPage = 'แสดง ' + (this.categoryCriteria.skip + 1) + ' ถึง ' + (this.categoryCriteria.skip + this.categoryPagination.itemsPerPage) + ' จาก ' + this.categoryPagination.totalItems + ' แถว';

      this.listCategory = [];
      model.objectData.forEach(element => {
        this.listCategory.push({ value: element.title, display: element.title });
      });
      this.listCategory.forEach(e => {
        for (let i = 0; i < this.messageInput.length; i++) {
          if(this.messageInput[i].category == e.value){
            e.isSelected = true;
          }
        }
      });
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  deleteItem(param, index) {
    this.listCategory.forEach(e => {
      if (e.value == param) {
        e.isSelected = false;
        this.allSelected = false;
      }
    });
    this.messageInput.splice(index, 1);
  }

  chooseCategory(param) {

    if (param != '') {
      if (this.messageInput.findIndex(item => item.category == param) === -1) {
        this.messageInput.splice(0, 0, { category: param });

        // console.log("element doesn't exist");
      }
      else {
        // console.log("element found");
      }
    }

    this.editModel.category = '';
  }

  setPerPage(param) {
    this.categoryCriteria.skip = 0;
    this.categoryCriteria.limit = parseInt(param);
    this.readCategory();
  }

  // start select user
  isAllSelected() {
    this.allSelected = this.listCategory.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  checkUncheckAll() {
    for (var i = 0; i < this.listCategory.length; i++) {
      this.listCategory[i].isSelected = this.allSelected;
      if (!this.listCategory[i].isSelected) {
        this.deleteItem('', this.listCategory[i])
      }
    }
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.messageInput = [];
    for (var i = 0; i < this.listCategory.length; i++) {
      if (this.listCategory[i].isSelected) {
        this.messageInput.push({ category: this.listCategory[i].value });
      }
    }
  }
  // end select uxs

  // <----- Pagination
  paginationModelChanged(changes: KeyValueChanges<string, any>) {

    if (this.isShow == '2') {
      // this.categorySelectList = [];
      this.categoryCriteria.skip = this.categoryPagination.currentPage == 1 ? 0 : (this.categoryPagination.currentPage * this.categoryPagination.itemsPerPage) - this.categoryPagination.itemsPerPage; // <----- Pagination
      this.categoryCriteria.limit = this.categoryPagination.itemsPerPage;
      this.readCategory();
    }
    /* If you want to see details then use
      changes.forEachRemovedItem((record) => ...);
      changes.forEachAddedItem((record) => ...);
      changes.forEachChangedItem((record) => ...);
    */
  }

  // <----- Pagination 
  ngDoCheck(): void {

    const categoryChanges = this.categoryPaginationDiffer.diff(this.categoryPagination);
    if (categoryChanges) {
      this.paginationModelChanged(categoryChanges);
    }
  }

  back() {
    this.router.navigate(['member'], { skipLocationChange: true });
  }

}
