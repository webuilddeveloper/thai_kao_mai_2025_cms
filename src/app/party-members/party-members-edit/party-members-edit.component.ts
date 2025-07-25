import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { FileUploadService } from "src/app/shared/file-upload.service";
import { ServiceProviderService } from "src/app/shared/service-provider.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-party-members-edit",
  templateUrl: "./party-members-edit.component.html",
  styleUrls: ["./party-members-edit.component.css"],
})
export class PartyMembersEditComponent implements OnInit {
  Editor = ClassicEditor;
  listCategory: any = [];
  editModel: any = { status: "N" };
  code: any;
  title = "เพิ่มข้อมูลสมาชิกพรรค";
  category: any;
  permission: any;
  permissionList: any;
  isSaveSuccess: boolean = false;
  param: any;
  itemSelected: boolean = false;
  itemSelectedList = [];

  listPrefixName: any = [];
  listMarital: any = [];
  listSex: any = [];
  listStatus: any = [];

  lv0Category: any = [];
  lv1Category: any = [];
  lv2Category: any = [];
  lv3Category: any = [];
  lv4Category: any = [];

  listCategoryProvince: any = [];
  listCategoryDistrict: any = [];
  listCategoryTambon: any = [];
  listCategoryPostCode: any = [];

  categoryProvince: any;
  categoryDistrict: any;
  categoryTambon: any;
  categoryPostCode: any;

  lvModel: any = [];

  constructor(
    private fileuploadService: FileUploadService,
    private serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private activetedRoute: ActivatedRoute
  ) {
    this.listPrefixName = [
      {
        value: "นาย",
        display: "นาย",
      },
      {
        value: "นาง",
        display: "นาง",
      },
      {
        value: "นางสาว",
        display: "นางสาว",
      },
    ];

    this.listSex = [
      {
        value: "ชาย",
        display: "ชาย",
      },
      {
        value: "หญิง",
        display: "หญิง",
      },
    ];

    this.listMarital = [
      {
        value: "โสด",
        display: "โสด",
      },
      {
        value: "สมรส",
        display: "สมรส",
      },
      {
        value: "หย่าร้าง",
        display: "หย่าร้าง",
      },
    ];

    this.listStatus = [
      {
        value: "รอการตรวจสอบ",
        display: "รอการตรวจสอบ",
      },
      {
        value: "รอการยืนยันตน",
        display: "รอการยืนยันตน",
      },
      {
        value: "ยืนยันตนสำเร็จ",
        display: "ยืนยันตนสำเร็จ",
      },
      {
        value: "ยืนยันตนไม่สำเร็จ",
        display: "ยืนยันตนไม่สำเร็จ",
      },
    ];
  }

  ngOnInit(): void {
    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe((params) => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;
      this.readCategoryOrganization("lv0");
      this.readCategoryProvince();
      // this.readCategory();
      if (this.code != "") {
        this.title = "แก้ไขข้อมูลสมาชิกพรรค";
        this.read();
      }
    });

    if (localStorage.getItem("category") != null) {
      this.category = JSON.parse(localStorage.getItem("category"));
    }
  }

  create() {
    this.spinner.show();

    let isValid = false;
    if (this.editModel.username == "") {
      this.toastr.warning("กรุณาใส่ชื่อผู้ใช้งาน", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      isValid = true;
    }

    if (this.editModel.password == "") {
      this.toastr.warning("กรุณาใส่รหัสผ่าน", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      isValid = true;
    }

    if (this.editModel.image.length == 0) {
      this.toastr.warning("กรุณาใส่รูปภาพ", "แจ้งเตือนระบบ", { timeOut: 2000 });
      isValid = true;
    }

    if (isValid) return;

    this.editModel.province = this.listCategoryProvince.find(
      (f) => f.value == this.editModel.provinceCode
    ).display;
    this.editModel.amphoe = this.listCategoryDistrict.find(
      (f) => f.value == this.editModel.amphoeCode
    ).display;
    this.editModel.tambon = this.listCategoryTambon.find(
      (f) => f.value == this.editModel.tambonCode
    ).display;
    this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    this.editModel.imageIdCardUrl = this.editModel.imageIdCard[0].imageUrl;
    this.editModel.imagePaymentUrl = this.editModel.imagePayment[0].imageUrl;
    this.serviceProviderService.post('partyMembers/create', this.editModel).subscribe(data => {

      let model: any = {};
      model = data;

      this.isSaveSuccess = true;
      this.spinner.hide();
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'แจ้งเตือนระบบ', { timeOut: 2000 });

      setTimeout(() => {
        this.back();
      }, 2000);

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, 'แจ้งเตือนระบบ', { timeOut: 2000 });
    });
  }

  read() {
    console.log("code :: ", this.code);
    this.serviceProviderService
      .post("partyMembers/read", { code: this.code })
      .subscribe(
        (data) => {
          let model: any = {};
          let rawCountUnit = [];
          model = data;
          this.editModel = model.objectData[0];

          this.readCategoryDistrict(this.editModel.provinceCode);
          this.readCategoryTambon(this.editModel.amphoeCode);
          this.readCategoryPostCode(this.editModel.tambonCode);

          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }

  readCategoryOrganization(lv) {
    this.serviceProviderService
      .postByPass("organization/category/read", { category: lv })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;

          this.lv0Category = [];
          model.objectData.forEach((element) => {
            this.lv0Category.push({
              value: element.code,
              display: element.title,
            });
          });
        },
        (err) => {}
      );
  }

  readCategoryOrganizationByLv(param, lv) {
    if (lv == "lv0") {
      this.editModel.lv0 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv1",
          lv0: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            this.lv1Category = [];
            model.objectData.forEach((element) => {
              this.lv1Category.push({
                value: element.code,
                display: element.title,
              });
            });
          },
          (err) => {}
        );
    } else if (lv == "lv1") {
      this.editModel.lv1 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv2",
          lv1: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            this.lv2Category = [];
            model.objectData.forEach((element) => {
              this.lv2Category.push({
                value: element.code,
                display: element.title,
              });
            });
          },
          (err) => {}
        );
    } else if (lv == "lv2") {
      this.editModel.lv2 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv3",
          lv2: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            this.lv3Category = [];
            model.objectData.forEach((element) => {
              this.lv3Category.push({
                value: element.code,
                display: element.title,
              });
            });
          },
          (err) => {}
        );
    }
  }

  readCategoryProvince() {
    if (this.editModel.language != "") {
      this.serviceProviderService.post("route/province/read", {}).subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.listCategoryProvince = [];
          model.objectData.forEach((element) => {
            this.listCategoryProvince.push({
              value: element.code,
              display: element.title,
            });
          });
        },
        (err) => {}
      );
    }
  }

  validProvince() {
    if (
      this.editModel.provinceCode == "" ||
      this.editModel.provinceCode == undefined
    ) {
      this.toastr.warning("กรุณาเลือกจังหวัด", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      return;
    }
  }

  validDistrict() {
    if (
      this.editModel.amphoeCode == "" ||
      this.editModel.amphoeCode == undefined
    ) {
      this.toastr.warning("กรุณาเลือกอำเภอ", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      return;
    }
  }

  validTambon() {
    if (
      this.editModel.tambonCode == "" ||
      this.editModel.tambonCode == undefined
    ) {
      this.toastr.warning("กรุณาเลือกตำบล", "แจ้งเตือนระบบ", { timeOut: 2000 });
      return;
    }
  }

  readCategoryDistrict(param) {
    if (param == "none" || param == "") {
    } else {
      this.editModel.provinceCode = param;
      if (this.editModel.language != "") {
        this.serviceProviderService
          .post("route/district/read", {
            province: this.editModel.provinceCode,
          })
          .subscribe(
            (data) => {
              let model: any = {};
              model = data;
              this.listCategoryDistrict = [];
              model.objectData.forEach((element) => {
                this.listCategoryDistrict.push({
                  value: element.code,
                  display: element.title,
                });
              });
            },
            (err) => {}
          );
      }
    }
  }

  readCategoryTambon(param) {
    if (param == "none" || param == "") {
    } else {
      this.editModel.amphoeCode = param;
      if (this.editModel.language != "") {
        this.serviceProviderService
          .post("route/tambon/read", { district: this.editModel.amphoeCode })
          .subscribe(
            (data) => {
              let model: any = {};
              model = data;
              this.listCategoryTambon = [];
              model.objectData.forEach((element) => {
                this.listCategoryTambon.push({
                  value: element.code,
                  display: element.title,
                });
              });
            },
            (err) => {}
          );
      }
    }
  }

  readCategoryPostCode(param) {
    if (param == "none" || param == "") {
    } else {
      this.editModel.tambonCode = param;
      if (this.editModel.language != "") {
        this.serviceProviderService
          .post("route/postCode/read", { tambon: this.editModel.tambonCode })
          .subscribe(
            (data) => {
              let model: any = {};
              model = data;
              this.listCategoryPostCode = [];
              model.objectData.forEach((element) => {
                this.listCategoryPostCode.push({
                  value: element.code,
                  display: element.postCode,
                });
              });
            },
            (err) => {}
          );
      }
    }
  }

  update() {
    this.spinner.show();
    let isValid = false;
    if (this.editModel.username == "") {
      this.toastr.warning("กรุณาใส่ชื่อผู้ใช้งาน", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      isValid = true;
    }

    if (isValid) {
      return;
    }

    if (this.editModel.image !== undefined) {
      this.editModel.imageUrl = this.editModel.image[0].imageUrl;
    }

    if (this.editModel.department1) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit + "," + "อาสาสมัครป้องกันภัยฝ่ายพลเรือน";
      } else {
        this.editModel.countUnit = "อาสาสมัครป้องกันภัยฝ่ายพลเรือน";
      }
    }
    if (this.editModel.department2) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit + "," + "เครือข่ายแจ้งเตือนภัยภาคประชาชน";
      } else {
        this.editModel.countUnit = "เครือข่ายแจ้งเตือนภัยภาคประชาชน";
      }
    }
    if (this.editModel.department3) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit + "," + "มิสเตอร์เตือนภัย";
      } else {
        this.editModel.countUnit = "มิสเตอร์เตือนภัย";
      }
    }
    if (this.editModel.department4) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit +
          "," +
          "อาสาสมัคร หนึ่งตำบลหนึ่งทีมกู้ชีพกู้ภัย (OTOS)";
      } else {
        this.editModel.countUnit =
          "อาสาสมัคร หนึ่งตำบลหนึ่งทีมกู้ชีพกู้ภัย (OTOS)";
      }
    }
    if (this.editModel.department5) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit +
          "," +
          "อาสาสมัครป้องกันและสาธารณภัย (อส.ปภ)";
      } else {
        this.editModel.countUnit = "อาสาสมัครป้องกันและสาธารณภัย (อส.ปภ)";
      }
    }
    if (this.editModel.department6) {
      if (this.editModel.countUnit != "") {
        this.editModel.countUnit =
          this.editModel.countUnit + "," + "องค์การสาธารณกุศล";
      } else {
        this.editModel.countUnit = "องค์การสาธารณกุศล";
      }
    }

    this.editModel.lv0 = "";
    this.editModel.lv1 = "";
    this.editModel.lv2 = "";
    this.editModel.lv3 = "";
    this.editModel.lv4 = "";

    this.editModel.organization = "manual";
    if (this.editModel.countUnit.length > 0) {
      this.editModel.countUnit.forEach((e) => {
        if (e.status == "A") {
          this.replaceCategoryLv0(e);
          this.replaceCategoryLv1(e);
          this.replaceCategoryLv2(e);
          this.replaceCategoryLv3(e);
          this.replaceCategoryLv4(e);
        }
      });
    }

    this.editModel.countUnit = JSON.stringify(this.editModel.countUnit);
    if (this.editModel.prefixName === "นาย") this.editModel.sex = "ชาย";
    else this.editModel.sex = "หญิง";

    this.serviceProviderService
      .post("partyMembers/update", this.editModel)
      .subscribe(
        (data) => {
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
          this.spinner.hide();
          this.toastr.error(err, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }

  // readCategory() {
  //   this.serviceProviderService.post('partyMembers/category/read', {}).subscribe(data => {
  //     let model: any = {};
  //     model = data;
  //     this.listCategory = [];
  //     model.objectData.forEach(element => {
  //       this.listCategory.push({ value: element.title, display: element.title });
  //     });
  //   }, err => {
  //     this.spinner.hide();
  //     this.toastr.error(err, 'แจ้งเตือนระบบ', { timeOut: 2000 });
  //   });
  // }

  checkPermission(param, param2) {
    if (param2 == "createAction") {
      let model = this.permissionList.filter((c) => c.title == param);
      if (model.length > 0 && this.code == "") {
        return model[0].createAction;
      }
    } else if (param2 == "updateAction") {
      let model = this.permissionList.filter((c) => c.title == param);
      if (model.length > 0 && this.code != "") {
        return model[0].updateAction;
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

  replaceCategoryLv0(param) {
    let arrayLv0 = this.editModel.lv0.split(",");

    for (let i = 0; i < arrayLv0.length; i++) {
      if (arrayLv0[i] != param.lv0) {
        if (this.editModel.lv0 == "") {
          this.editModel.lv0 = param.lv0;
        } else {
          this.editModel.lv0 = this.editModel.lv0 + "," + param.lv0;
        }
      }
    }
  }
  replaceCategoryLv1(param) {
    let arrayLv1 = this.editModel.lv1.split(",");

    for (let i = 0; i < arrayLv1.length; i++) {
      if (arrayLv1[i] != param.lv1) {
        if (this.editModel.lv1 == "") {
          this.editModel.lv1 = param.lv1;
        } else {
          this.editModel.lv1 = this.editModel.lv1 + "," + param.lv1;
        }
      }
    }
  }
  replaceCategoryLv2(param) {
    let arrayLv2 = this.editModel.lv2.split(",");

    for (let i = 0; i < arrayLv2.length; i++) {
      if (arrayLv2[i] != param.lv2) {
        if (this.editModel.lv2 == "") {
          this.editModel.lv2 = param.lv2;
        } else {
          this.editModel.lv2 = this.editModel.lv2 + "," + param.lv2;
        }
      }
    }
  }
  replaceCategoryLv3(param) {
    let arrayLv3 = this.editModel.lv3.split(",");

    for (let i = 0; i < arrayLv3.length; i++) {
      if (arrayLv3[i] != param.lv3) {
        if (this.editModel.lv3 == "") {
          this.editModel.lv3 = param.lv3;
        } else {
          this.editModel.lv3 = this.editModel.lv3 + "," + param.lv3;
        }
      }
    }
  }
  replaceCategoryLv4(param) {
    let arrayLv4 = this.editModel.lv4.split(",");

    for (let i = 0; i < arrayLv4.length; i++) {
      if (arrayLv4[i] != param.lv4) {
        if (this.editModel.lv4 == "") {
          this.editModel.lv4 = param.lv4;
        } else {
          this.editModel.lv4 = this.editModel.lv4 + "," + param.lv4;
        }
      }
    }
  }

  // start select user
  async isAllSelected(param) {
    let status = await this.validateCategory(param);
    if (status) {
      this.itemSelected = await this.editModel.countUnit.every(function (
        item: any
      ) {
        return item.isSelected == true;
      });
    }
    this.getCheckedItemList();
  }

  async checkUncheckAll() {
    for (var i = 0; i < this.editModel.countUnit.length; i++) {
      let status = await this.validateCategory(i);

      if (status) {
        this.editModel.countUnit[i].isSelected = this.itemSelected;
      } else {
        // TODO..
      }
    }
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.itemSelectedList = [];
    for (var i = 0; i < this.editModel.countUnit.length; i++) {
      if (this.editModel.countUnit[i].isSelected)
        this.itemSelectedList.push(this.editModel.countUnit[i]);
    }
  }
  // end select uxs

  async deleteOrganizationItem(param) {
    let isDelete = await this.validateCategory(param);

    if (isDelete) {
      this.editModel.countUnit.splice(param, 1);
    } else {
      this.toastr.warning(
        "คุณไม่ได้รับสิทธิในการลบข้อมูลนี้",
        "แจ้งเตือนระบบ",
        { timeOut: 1000 }
      );
    }
  }

  deleteAll() {
    const dialogRef = this.dialog.open(ConfirmDeleteDialog, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);

      if (result) {
        // check permission

        this.itemSelectedList.forEach((e) => {
          this.editModel.countUnit.forEach((o, index) => {
            if (e.titleLv0 == o.titleLv0)
              this.editModel.countUnit.splice(index, 1);
          });
        });
      }
    });
  }

  validateCategory(param) {
    let code4 = this.editModel.countUnit[param].lv4;
    let code3 = this.editModel.countUnit[param].lv3;
    let code2 = this.editModel.countUnit[param].lv2;
    let code1 = this.editModel.countUnit[param].lv1;
    let code0 = this.editModel.countUnit[param].lv0;

    // validate lv 4
    if (code4 != "") {
      let arrayCategoryLv4 = this.category.lv4.split(",");

      for (let i = 0; i < arrayCategoryLv4.length; i++) {
        if (arrayCategoryLv4[i] == code4) {
          return true;
        }
      }
    }

    // validate lv 3
    if (this.category.lv3 != "" && code3 != "") {
      let arrayCategoryLv3 = this.category.lv3.split(",");
      for (let i = 0; i < arrayCategoryLv3.length; i++) {
        if (arrayCategoryLv3[i] == code3) {
          return true;
        }
      }
    }

    // validate lv 2
    if (this.category.lv2 != "" && code2 != "") {
      let arrayCategoryLv2 = this.category.lv2.split(",");
      for (let i = 0; i < arrayCategoryLv2.length; i++) {
        if (arrayCategoryLv2[i] == code2) {
          return true;
        }
      }
    }

    // validate lv 1
    if (this.category.lv1 != "" && code1 != "") {
      let arrayCategoryLv1 = this.category.lv1.split(",");
      for (let i = 0; i < arrayCategoryLv1.length; i++) {
        if (arrayCategoryLv1[i] == code1) {
          return true;
        }
      }
    }

    // validate lv 0
    if (this.category.lv0 != "" && code0 != "") {
      let arrayCategoryLv0 = this.category.lv0.split(",");
      for (let i = 0; i < arrayCategoryLv0.length; i++) {
        if (arrayCategoryLv0[i] == code0) {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  async checkStatus(status, index) {
    let isApprove = await this.validateCategory(index);
    if (isApprove) {
      this.editModel.countUnit[index].status = status;
      this.editModel.status = status;
      this.editModel.isActive = true;
      this.toastr.success("ข้อมูลถูกตรวจสอบเรียบร้อยแล้ว", "", {
        timeOut: 1000,
      });
    } else {
      this.toastr.warning(
        "คุณไม่ได้รับสิทธิในการยืนยันข้อมูลนี้",
        "แจ้งเตือนระบบ",
        { timeOut: 1000 }
      );
    }
  }

  readCategory(lv) {
    this.serviceProviderService
      .postByPass("organization/category/read", { category: lv })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.lv0Category = [];
          model.objectData.forEach((element) => {
            this.lv0Category.push({
              value: element.code,
              display: element.title,
            });
          });
        },
        (err) => {}
      );
  }

  readCategoryByLv(param, lv, param2) {
    if (lv == "lv0") {
      param2.lv0 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv1",
          lv0: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            param2.lv1Category = [];

            if (param != "") {
              // <----- ต้องดักไม่งั้น lv จะเลือกได้
              model.objectData.forEach((element) => {
                param2.lv1Category.push({
                  value: element.code,
                  display: element.title,
                });
              });
            }
          },
          (err) => {}
        );
    } else if (lv == "lv1") {
      param2.lv1 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv2",
          lv1: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            param2.lv2Category = [];

            if (param != "") {
              // <----- ต้องดักไม่งั้น lv จะเลือกได้
              model.objectData.forEach((element) => {
                param2.lv2Category.push({
                  value: element.code,
                  display: element.title,
                });
              });
            }
          },
          (err) => {}
        );
    } else if (lv == "lv2") {
      param2.lv2 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv3",
          lv2: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            param2.lv3Category = [];

            if (param != "") {
              // <----- ต้องดักไม่งั้น lv จะเลือกได้
              model.objectData.forEach((element) => {
                param2.lv3Category.push({
                  value: element.code,
                  display: element.title,
                });
              });
            }
          },
          (err) => {}
        );
    } else if (lv == "lv3") {
      param2.lv3 = param;
      this.serviceProviderService
        .postByPass("organization/category/read", {
          category: "lv4",
          lv3: param,
        })
        .subscribe(
          (data) => {
            let model: any = {};
            model = data;
            param2.lv4Category = [];

            if (param != "") {
              // <----- ต้องดักไม่งั้น lv จะเลือกได้
              model.objectData.forEach((element) => {
                param2.lv4Category.push({
                  value: element.code,
                  display: element.title,
                });
              });
            }
          },
          (err) => {}
        );
    } else if (lv == "lv4") {
      param2.lv4 = param;
    }
  }

  back() {
    this.router.navigate(["party-members"], { skipLocationChange: true });
  }

}

@Component({
  selector: "confirm-delete-dialog",
  templateUrl: "confirm-delete-dialog.html",
})
export class ConfirmDeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.dialogRef.close(false);
  }

  ok() {
    this.dialogRef.close(true);
  }
}
