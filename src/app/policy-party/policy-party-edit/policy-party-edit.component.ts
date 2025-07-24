import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiProviderService } from 'src/app/shared/api-provider.service';
import { ExcelService } from 'src/app/shared/excel.service';
import { OrganizationService } from 'src/app/shared/organization.service';
import { PermissionService } from 'src/app/shared/permission.service';
import { ServiceProviderService } from 'src/app/shared/service-provider.service';
import { ValidateService } from 'src/app/shared/validate.service';

@Component({
  selector: 'app-policy-party-edit',
  templateUrl: './policy-party-edit.component.html',
  styleUrls: ['./policy-party-edit.component.css']
})
export class PolicyPartyEditComponent implements OnInit {

  Editor = ClassicEditor;
  listCategory: any = [];
  editModel: any = { fileUrl: '', file: [], sequence: 10, language: 'th', center: localStorage.getItem('userCenter') };
  listCenter: any = [];
  commentList: any = [];
  functionList: any = [];
  commentModel: any;
  hiddenBtnComment: boolean = false;
  hiddenComment: boolean = true;
  momentCriteriaModel: any = {};
  imageFile: string = '';
  code: any;
  title = 'เพิ่มข้อมูลนโยบายพรรค';
  organization: any; // <----- Organization เก็บค่า องกรค์
  category: any; // <----- Category เพื่ออ่านสิทธิ์ Organization ของ User ว่าสามารถเห็นระดับไหน
  permission: any; // <----- Permission ส่งเข้า Read เพื่อให้เห็นเฉพาะ Category ที่ถูกเซตไว้กับ Role สรุปคือ (Category Code List)
  permissionList: any; // <----- PermissionList ไว้สำหรับตรวจสอบว่า Category มีสิทธิ์ในการ Create Read Update Read หรือเปล่า
  isSaveSuccess: boolean = false;
  lv0Category: any = []; // <----- Organization
  lv1Category: any = []; // <----- Organization
  lv2Category: any = []; // <----- Organization
  lv3Category: any = []; // <----- Organization
  lv4Category: any = []; // <----- Organization
  isReadOGLv0: boolean; // <----- Organization
  isReadOGLv1: boolean; // <----- Organization
  isReadOGLv2: boolean; // <----- Organization
  isReadOGLv3: boolean; // <----- Organization
  isReadOGLv4: boolean; // <----- Organization
  isSortImage: boolean = true;

  url: any = {};

  imagePdf = './assets/img/267px-PDF_file_icon.svg.png';
  imageExcel = './assets/img/excel.png';
  imageVDO = './assets/img/vdo.png';
  imageWord = './assets/img/word.png';


  constructor(private apiProviderService: ApiProviderService
    , private validService: ValidateService
    , private organizationService: OrganizationService
    , private permissionService: PermissionService
    , private serviceProviderService: ServiceProviderService
    , private spinner: NgxSpinnerService
    , private excelService: ExcelService
    , private toastr: ToastrService
    , private router: Router
    , private activetedRoute: ActivatedRoute) {

    this.url = {
      create: this.apiProviderService.policyParty.create,
      read: this.apiProviderService.policyParty.read,
      update: this.apiProviderService.policyParty.update,
      delete: this.apiProviderService.policyParty.delete,
      category: {
        create: this.apiProviderService.policyParty.category.create,
        read: this.apiProviderService.policyParty.category.read,
        update: this.apiProviderService.policyParty.category.update,
        delete: this.apiProviderService.policyParty.category.delete
      },
      gallery: {
        create: this.apiProviderService.policyParty.gallery.create,
        read: this.apiProviderService.policyParty.gallery.read,
        update: this.apiProviderService.policyParty.gallery.update,
        delete: this.apiProviderService.policyParty.gallery.delete
      },
      galleryFile: {
        create: this.apiProviderService.policyParty.galleryFile.create,
        read: this.apiProviderService.policyParty.galleryFile.read,
        update: this.apiProviderService.policyParty.galleryFile.update,
        delete: this.apiProviderService.policyParty.galleryFile.delete
      }
    }

  }

  ngOnInit(): void {
    this.permission = this.permissionService.readPermission('policyPartyPage');
    this.permissionList = this.permissionService.readLocalStorage('policyPartyPage');
    this.organization = this.permissionService.readLocalStorage('organization');
    this.category = this.permissionService.readLocalStorage('category');

    this.activetedRoute.queryParams.subscribe(params => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      if (this.code != '') {
        this.title = 'แก้ไขข้อมูลผลงาน';
        this.read();
      } else {
        this.readCategory(this.editModel.language);
        this.hiddenBtnComment = true; // ปิดปุ่ม comment ตอน create
      }
    });

  }

  create() {

    if (this.editModel.category == '') {
      this.toastr.warning('กรุณาเลือกหมวดหมู่', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    this.spinner.show();
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    if (this.editModel.imageB.length > 0)
      this.editModel.imageBanner = this.editModel.imageB[0].imageUrl;

    //fileUrl create
    if (this.editModel.file != undefined) {
      if (this.editModel.file.length > 0)
        this.editModel.fileUrl = this.editModel.file[0].fileUrl;
      else
        this.editModel.fileUrl = '';
    }

    // <----- Organization
    this.editModel = this.organizationService.filterSelected(this.editModel, this.lv0Category, this.lv1Category, this.lv2Category, this.lv3Category, this.lv4Category);
    // <----- Organization

    // convert function list to String.
    this.editModel.functionList = JSON.stringify(this.functionList);

    this.serviceProviderService.post(this.url.create, this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      if (this.editModel.gallery.length > 0) {
        this.editModel.gallery.forEach(element => {
          element.reference = model.objectData.code;
          element.imageUrl = element.imageUrl;
          this.serviceProviderService.post(this.url.gallery.create, element).subscribe(data => { }, err => { });
        });
      }

      // if (this.editModel.galleryFile.length > 0) {
      //   this.editModel.galleryFile.forEach(element => {
      //     element.reference = model.objectData.code;
      //     element.imageUrl = element.imageUrl;
      //     element.type = element.type;
      //     element.title = element.title;
      //     this.serviceProviderService.post(this.url.galleryFile.create, element).subscribe(data => { }, err => { });
      //   });
      // }
      this.isSaveSuccess = true;
      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 1000 });

      setTimeout(() => { this.back(); }, 2000);

    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 1000 });
    });
  }

  read() {
    this.spinner.show();
    this.serviceProviderService.post(this.url.read, { code: this.code, permission: this.permission }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel = model.objectData[0];

      if (this.editModel.functionList != '' && this.editModel.functionList != null) {
        this.functionList = JSON.parse(this.editModel.functionList);
      }

      // image file
      if (this.editModel.fileUrl != '') {
        let resultArray = this.editModel.fileUrl.split('.');
        let type = resultArray[resultArray.length - 1];
        if (type == 'pdf') {
          this.imageFile = 'assets/img/267px-PDF_file_icon.svg.png';
        } else {
          this.imageFile = 'assets/img/excel.png';
        }
      }

      if (this.editModel.categoryList.length > 0)
        this.editModel.category = this.editModel.categoryList[0].code;

      this.readCategory(this.editModel.language);
      this.galleryRead();
      this.galleryFileRead();

      // <----- Organization
      this.editModel.chkManualOG = true; // <----- Organization
      this.editModel.organization = 'manual'; // <----- Organization
      this.isReadOGLv0 = true; // <----- Organization
      this.isReadOGLv1 = true; // <----- Organization
      this.isReadOGLv2 = true; // <----- Organization
      this.isReadOGLv3 = true; // <----- Organization
      this.isReadOGLv4 = true; // <----- Organization
      // -----> Organization

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  update() {
    debugger
    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    if (this.editModel.imageB != undefined)
      this.editModel.imageBanner = this.editModel.imageB[0].imageUrl;

    if (this.editModel.category == '') {
      this.toastr.warning('กรุณาเลือกหมวดหมู่', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return;
    }

    //fileUrl update
    if (this.editModel.file != undefined) {
      if (this.editModel.file.length > 0) {
        this.editModel.fileUrl = this.editModel.file[0].fileUrl;
      }
      else {
        this.editModel.fileUrl = '';
      }
    }

    this.editModel.functionList = JSON.stringify(this.functionList);

    // <----- Organization
    this.editModel = this.organizationService.filterSelected(this.editModel, this.lv0Category, this.lv1Category, this.lv2Category, this.lv3Category, this.lv4Category);
    // <----- Organization

    this.spinner.show();
    this.serviceProviderService.post(this.url.update, this.editModel).subscribe(data => {

      this.serviceProviderService.post(this.url.gallery.delete, this.editModel).subscribe(data => {
        if (this.editModel.gallery.length > 0) {
          this.editModel.gallery.forEach(element => {
            // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
            element.reference = this.editModel.code;
            element.imageUrl = element.imageUrl;
            this.serviceProviderService.post(this.url.gallery.create, element).subscribe(data => { }, err => { });
          });
        }
      }, err => { });

      this.serviceProviderService.post(this.url.galleryFile.delete, this.editModel).subscribe(data => {
        if (this.editModel.galleryFile.length > 0) {
          this.editModel.galleryFile.forEach(element => {
            // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
            element.reference = this.editModel.code;
            element.imageUrl = element.imageUrl;
            element.type = element.type;
            element.title = element.title;
            this.serviceProviderService.post(this.url.galleryFile.create, element).subscribe(data => { }, err => { });
          });
        }
      }, err => { });

      this.isSaveSuccess = true;
      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });

      setTimeout(() => {
        this.back();
      }, 2000);

    }, err => {
      this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  readCategory(param: string) {
    this.editModel.language = param;
    if (this.editModel.language != '') {
      this.serviceProviderService.post('policyParty/category/read', { language: param, permission: this.permission }).subscribe(data => {
        let model: any = {};
        model = data;
        this.listCategory = [{ value: '', display: 'เลือกหมวดหมู่' }];
        model.objectData.forEach(element => {
          this.listCategory.push({ value: element.code, display: element.title });
        });

        if (this.code == '')
          this.editModel.category = this.listCategory[0].value;
      }, err => { });
    }
  }

  galleryRead() {
    this.serviceProviderService.post('m/policyParty/gallery/read', { code: this.editModel.code }).subscribe(data => {
      let model: any = {};
      model = data;
      // this.editModel.gallery = model.objectData;
      this.editModel.gallery = [];
      var idx = 0;
      model.objectData.forEach((c) => {
        idx++;
        c.sequence = idx;
        this.editModel.gallery.push(c);
      });
    }, err => { });
  }

  galleryFileRead() {
    this.serviceProviderService.post('m/policyParty/galleryFile/read', { code: this.editModel.code }).subscribe(data => {
      let model: any = {};
      model = data;
      this.editModel.galleryFile = model.objectData;
      this.editModel.galleryFile.forEach(f => {
        if (f.type == 'pdf')
          f.image = this.imagePdf;
        else if (f.type == 'excel')
          f.image = this.imageExcel;
        else if (f.type == 'mp4')
          f.image = this.imageVDO;
        else if (f.type == 'word')
          f.image = this.imageWord;
        if (f.title != '')
          f.imageName = f.title;
      });
    }, err => { });
  }

  checkSave() {
    if (this.code != '') {
      // <----- Validate title, image, category
      if (this.validService.isValidateUpdate(this.editModel))
        return;

      this.checkPermission(this.editModel.category, 'updateAction')
    } else {
      // <----- Validate title, image, category
      if (this.validService.isValidateCreate(this.editModel))
        return;

      this.checkPermission(this.editModel.category, 'createAction')
    }

  }

  checkPermission(param, param2) {
    if (param2 == 'createAction') {
      let model = this.permissionList.filter(c => c.title == param);
      if (model.length > 0 && this.code == '') {
        if (model[0].createAction)
          this.create();
      }
    }
    else if (param2 == 'updateAction') {
      let model = this.permissionList.filter(c => c.title == param);
      if (model.length > 0 && this.code != '') {
        if (model[0].updateAction)
          this.update();
      }
    }
    else if (param2 == 'approveAction') {
      let model = this.permissionList.filter(c => c.title == param);
      if (model.length > 0) {
        if (!model[0].approveAction) {
          this.editModel.isActive = false;
        }

        return model[0].approveAction;
      }
    }

  }

  exportAsXLSX(): void {
    this.serviceProviderService.post('policyParty/comment/read', { skip: 0, limit: 999999, code: this.code }).subscribe(data => {
      let model: any = {};
      let result: any = [];
      model = data;
      // this.data = model.objectData; // <----- Pagination
      model.objectData.forEach((e, index) => {

        if (e.isActive) {
          e.textStatus = 'อนุญาตให้แสดงความคิดเห็น'
        } else {
          e.textStatus = 'ไม่อนุญาตให้แสดงความคิดเห็น'
        }

        result.push({
          'ลำดับ': index + 1,
          'ความคิดเห็น': e.description,
          'ชื่อผู้ใช้': e.createBy,
          'วันที่': e.createDate,
          'สถานะ': e.textStatus,
        })
      });

      this.excelService.exportAsExcelFile(result, 'รายงาน ความคิดเห็น');
    }, err => {
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  back() {
    this.router.navigate(['policy-party'], { skipLocationChange: true });
  }

  addFunction() {
    if (this.functionList.length >= 6) {
      this.toastr.warning('function สูงสุด 6 function', 'แจ้งเตือนระบบ', { timeOut: 1000 });
      return
    }
    this.functionList.push({ title: '', description: '' });
  }

  deleteFunction(index) {
    this.functionList.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.editModel.gallery,
      event.previousIndex,
      event.currentIndex
    );
    let index = 0;
    this.editModel.gallery.forEach((c) => {
      index++;
      c.sequence = index;
    });
  }


}
