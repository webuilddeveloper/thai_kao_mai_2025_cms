import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FileUploadService } from "src/app/shared/file-upload.service";
import { ServiceProviderService } from "src/app/shared/service-provider.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ApiProviderService } from "src/app/shared/api-provider.service";
import { ValidateService } from "src/app/shared/validate.service";
import { OrganizationService } from "src/app/shared/organization.service";
import { PermissionService } from "src/app/shared/permission.service";
import { ExcelService } from "src/app/shared/excel.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-news-edit",
  templateUrl: "./news-edit.component.html",
  styleUrls: ["./news-edit.component.css"],
})
export class NewsEditComponent implements OnInit {
  Editor = ClassicEditor;
  listCategory: any = [];
  editModel: any = {
    fileUrl: "",
    file: [],
    sequence: 10,
    language: "th",
    center: localStorage.getItem("userCenter"),
  };
  listCenter: any = [];
  commentList: any = [];
  productList: any = [];
  commentModel: any;
  hiddenBtnComment: boolean = false;
  hiddenComment: boolean = true;
  momentCriteriaModel: any = {};
  imageFile: string = "";
  code: any;
  title = "เพิ่มข้อมูลข่าวประชาสัมพันธ์";
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

  imagePdf = "./assets/img/267px-PDF_file_icon.svg.png";
  imageExcel = "./assets/img/excel.png";
  imageVDO = "./assets/img/vdo.png";
  imageWord = "./assets/img/word.png";

  constructor(
    private apiProviderService: ApiProviderService,
    private validService: ValidateService,
    private organizationService: OrganizationService,
    private permissionService: PermissionService,
    private serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    private excelService: ExcelService,
    private toastr: ToastrService,
    private router: Router,
    private activetedRoute: ActivatedRoute
  ) {
    this.url = {
      create: this.apiProviderService.news.create,
      read: this.apiProviderService.news.read,
      update: this.apiProviderService.news.update,
      delete: this.apiProviderService.news.delete,
      category: {
        create: this.apiProviderService.news.category.create,
        read: this.apiProviderService.news.category.read,
        update: this.apiProviderService.news.category.update,
        delete: this.apiProviderService.news.category.delete,
      },
      gallery: {
        create: this.apiProviderService.news.gallery.create,
        read: this.apiProviderService.news.gallery.read,
        update: this.apiProviderService.news.gallery.update,
        delete: this.apiProviderService.news.gallery.delete,
      },
      galleryFile: {
        create: this.apiProviderService.news.galleryFile.create,
        read: this.apiProviderService.news.galleryFile.read,
        update: this.apiProviderService.news.galleryFile.update,
        delete: this.apiProviderService.news.galleryFile.delete,
      },
    };
  }

  ngOnInit(): void {
    this.permission = this.permissionService.readPermission("newsPage");
    this.permissionList = this.permissionService.readLocalStorage("newsPage");
    this.organization = this.permissionService.readLocalStorage("organization");
    this.category = this.permissionService.readLocalStorage("category");

    this.activetedRoute.queryParams.subscribe((params) => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;
      this.readProduct();

      if (this.code != "") {
        this.title = "แก้ไขข้อมูลข่าวประชาสัมพันธ์";
        this.read();
      } else {
        this.readCategory(this.editModel.language);
        this.hiddenBtnComment = true; // ปิดปุ่ม comment ตอน create
      }
    });
  }

  create() {
    this.spinner.show();
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    if (this.editModel?.imageB.length > 0)
      this.editModel.imageBanner = this.editModel.imageB[0].imageUrl;

    //fileUrl create
    if (this.editModel?.file != undefined) {
      if (this.editModel.file.length > 0)
        this.editModel.fileUrl = this.editModel.file[0].fileUrl;
      else this.editModel.fileUrl = "";
    }

    // <----- Organization
    this.editModel = this.organizationService.filterSelected(
      this.editModel,
      this.lv0Category,
      this.lv1Category,
      this.lv2Category,
      this.lv3Category,
      this.lv4Category
    );
    // <----- Organization

    this.serviceProviderService.post(this.url.create, this.editModel).subscribe(
      (data) => {
        let model: any = {};
        model = data;

        if (this.editModel?.gallery?.length > 0) {
          this.editModel.gallery.forEach((element) => {
            element.reference = model.objectData.code;
            element.imageUrl = element.imageUrl;
            this.serviceProviderService
              .post(this.url.gallery.create, element)
              .subscribe(
                (data) => {},
                (err) => {}
              );
          });
        }

        if (this.editModel?.galleryFile?.length > 0) {
          this.editModel.galleryFile.forEach((element) => {
            element.reference = model.objectData.code;
            element.imageUrl = element.imageUrl;
            element.type = element.type;
            element.title = element.title;
            this.serviceProviderService
              .post(this.url.galleryFile.create, element)
              .subscribe(
                (data) => {},
                (err) => {}
              );
          });
        }
        this.isSaveSuccess = true;
        this.spinner.hide();
        this.toastr.success("บันทึกข้อมูลสำเร็จ", "แจ้งเตือนระบบ", {
          timeOut: 1000,
        });

        setTimeout(() => {
          this.back();
        }, 2000);
      },
      (err) => {
        this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 1000 });
      }
    );
  }

  read() {
    this.spinner.show();
    this.serviceProviderService
      .post(this.url.read, { code: this.code, permission: this.permission })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.editModel = model.objectData[0];

          // image file
          if (this.editModel.fileUrl != "") {
            let resultArray = this.editModel.fileUrl.split(".");
            let type = resultArray[resultArray.length - 1];
            if (type == "pdf") {
              this.imageFile = "assets/img/267px-PDF_file_icon.svg.png";
            } else {
              this.imageFile = "assets/img/excel.png";
            }
          }

          if (this.editModel.categoryList.length > 0)
            this.editModel.category = this.editModel.categoryList[0].code;

          this.readCategory(this.editModel.language);
          this.galleryRead();
          this.galleryFileRead();

          // <----- Organization
          this.editModel.chkManualOG = true; // <----- Organization
          this.editModel.organization = "manual"; // <----- Organization
          this.isReadOGLv0 = true; // <----- Organization
          this.isReadOGLv1 = true; // <----- Organization
          this.isReadOGLv2 = true; // <----- Organization
          this.isReadOGLv3 = true; // <----- Organization
          this.isReadOGLv4 = true; // <----- Organization
          // -----> Organization

          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }

  update() {
    if (this.editModel.image != undefined)
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;

    if (this.editModel?.imageB != undefined)
      if (this.editModel?.imageB?.length > 0)
        this.editModel.imageBanner = this.editModel.imageB[0].imageUrl;

    //fileUrl update
    if (this.editModel.file != undefined) {
      if (this.editModel.file.length > 0) {
        this.editModel.fileUrl = this.editModel.file[0].fileUrl;
      } else {
        this.editModel.fileUrl = "";
      }
    }

    // <----- Organization
    this.editModel = this.organizationService.filterSelected(
      this.editModel,
      this.lv0Category,
      this.lv1Category,
      this.lv2Category,
      this.lv3Category,
      this.lv4Category
    );
    // <----- Organization

    this.spinner.show();
    this.serviceProviderService.post(this.url.update, this.editModel).subscribe(
      (data) => {
        this.serviceProviderService
          .post(this.url.gallery.delete, this.editModel)
          .subscribe(
            (data) => {
              if (this.editModel?.gallery?.length > 0) {
                this.editModel.gallery.forEach((element) => {
                  // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
                  element.reference = this.editModel.code;
                  element.imageUrl = element.imageUrl;
                  this.serviceProviderService
                    .post(this.url.gallery.create, element)
                    .subscribe(
                      (data) => {},
                      (err) => {}
                    );
                });
              }
            },
            (err) => {}
          );

        this.serviceProviderService
          .post(this.url.galleryFile.delete, this.editModel)
          .subscribe(
            (data) => {
              if (this.editModel?.galleryFile?.length > 0) {
                this.editModel.galleryFile.forEach((element) => {
                  // element.code = this.editModel.code; //เพิ่ม set active false ทั้วหมด
                  element.reference = this.editModel.code;
                  element.imageUrl = element.imageUrl;
                  element.type = element.type;
                  element.title = element.title;
                  this.serviceProviderService
                    .post(this.url.galleryFile.create, element)
                    .subscribe(
                      (data) => {},
                      (err) => {}
                    );
                });
              }
            },
            (err) => {}
          );

        this.isSaveSuccess = true;
        this.spinner.hide();
        this.toastr.success("บันทึกข้อมูลสำเร็จ", "แจ้งเตือนระบบ", {
          timeOut: 2000,
        });

        setTimeout(() => {
          this.back();
        }, 2000);
      },
      (err) => {
        this.toastr.error(err, "แจ้งเตือนระบบ", { timeOut: 2000 });
      }
    );
  }

  readCategory(param: string) {
    this.editModel.language = param;
    if (this.editModel.language != "") {
      this.serviceProviderService
        .post("news/category/read", {
          language: param,
          permission: this.permission,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            this.listCategory = [{ value: "", display: "เลือกหมวดหมู่" }];
            model.objectData.forEach((element) => {
              this.listCategory.push({
                value: element.code,
                display: element.title,
              });
            });
            if (this.code == "")
              this.editModel.category = this.listCategory[0].value;
          },
          (err) => {}
        );
    }
  }

  readProduct() {
    this.serviceProviderService
      .post("m/product/read", { permission: this.permission })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.productList = [{ value: "", display: "งานภายใน" }];
          model.objectData.forEach((element) => {
            this.productList.push({
              value: element.code,
              display: element.title,
            });
          });
          if (this.code == "")
            this.editModel.productCode = this.productList[0].value;
        },
        (err) => {}
      );
  }

  galleryRead() {
    this.serviceProviderService
      .post("m/news/gallery/read", { code: this.editModel.code })
      .subscribe(
        (data) => {
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
        },
        (err) => {}
      );
  }

  galleryFileRead() {
    this.serviceProviderService
      .post("m/news/galleryFile/read", { code: this.editModel.code })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.editModel.galleryFile = model.objectData;
          this.editModel.galleryFile.forEach((f) => {
            if (f.type == "pdf") f.image = this.imagePdf;
            else if (f.type == "excel") f.image = this.imageExcel;
            else if (f.type == "mp4") f.image = this.imageVDO;
            else if (f.type == "word") f.image = this.imageWord;
            if (f.title != "") f.imageName = f.title;
          });
        },
        (err) => {}
      );
  }

  checkSave() {
    if (this.code != "") {
      // <----- Validate title, image, category
      if (this.validService.isValidateUpdate(this.editModel)) return;

      this.checkPermission(this.editModel.category, "updateAction");
    } else {
      // <----- Validate title, image, category
      if (this.validService.isValidateCreate(this.editModel)) return;

      this.checkPermission(this.editModel.category, "createAction");
    }
  }

  checkPermission(param, param2) {
    if (param2 == "createAction") {
      let model = this.permissionList.filter((c) => c.title == param);
      if (model.length > 0 && this.code == "") {
        if (model[0].createAction) this.create();
      }
    } else if (param2 == "updateAction") {
      let model = this.permissionList.filter((c) => c.title == param);
      if (model.length > 0 && this.code != "") {
        if (model[0].updateAction) this.update();
      }
    } else if (param2 == "approveAction") {
      let model = this.permissionList.filter((c) => c.title == param);
      if (model.length > 0) {
        if (!model[0].approveAction) {
          this.editModel.isActive = false;
        }

        return model[0].approveAction;
      }
    }
  }

  exportAsXLSX(): void {
    this.serviceProviderService
      .post("news/comment/read", { skip: 0, limit: 999999, code: this.code })
      .subscribe(
        (data) => {
          let model: any = {};
          let result: any = [];
          model = data;
          // this.data = model.objectData; // <----- Pagination
          model.objectData.forEach((e, index) => {
            if (e.isActive) {
              e.textStatus = "อนุญาตให้แสดงความคิดเห็น";
            } else {
              e.textStatus = "ไม่อนุญาตให้แสดงความคิดเห็น";
            }

            result.push({
              ลำดับ: index + 1,
              ความคิดเห็น: e.description,
              ชื่อผู้ใช้: e.createBy,
              วันที่: e.createDate,
              สถานะ: e.textStatus,
            });
          });

          this.excelService.exportAsExcelFile(result, "รายงาน ความคิดเห็น");
        },
        (err) => {
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }

  back() {
    this.router.navigate(["news"], { skipLocationChange: true });
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
