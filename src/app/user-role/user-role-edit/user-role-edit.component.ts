import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { ServiceProviderService } from "../../shared/service-provider.service";
import {
  Component,
  OnInit,
  Inject,
  KeyValueDiffer,
  KeyValueDiffers,
  KeyValueChanges,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: "app-user-role-edit",
  templateUrl: "./user-role-edit.component.html",
  styleUrls: ["./user-role-edit.component.css"],
})
export class UserRoleEditComponent implements OnInit {
  title = "เพิ่มข้อมูลสิทธิ์ผู้ใช้งาน";
  editModel: any = {};
  code: any;
  category: any;

  lv0Category: any = [];
  lv1Category: any = [];
  lv2Category: any = [];
  lv3Category: any = [];
  lv4Category: any = [];

  lv0: any = [];
  lv1: any = [];
  lv2: any = [];
  lv3: any = [];
  lv4: any = [];
  lvModel: any = [];

  newsCategory: any = [];
  eventCategory: any = [];
  policyPartyCategory: any = [];
  partyExecutiveCategory: any = [];
  suggestionCategory: any = [];
  donateCategory: any = [];

  messageInput: any = [];
  messageInputSlice: any = [];
  paginationModelDiffer: KeyValueDiffer<string, any>; // <----- Pagination
  paginationModel: any = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
    itemsPerPageString: "5",
  }; // <----- Pagination

  constructor(
    private serviceProviderService: ServiceProviderService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private differs: KeyValueDiffers
  ) {}

  ngOnInit(): void {
    this.readCategory("lv0");
    this.readNewsCategory();
    this.readEventCategory();
    this.readPolicyPartyCategory();
    this.readPartyExecutiveCategory();
    this.readSuggestionCategory();
    this.readDonateCategory();

    // this.editModel.image = [];
    this.activetedRoute.queryParams.subscribe((params) => {
      let model: any = this.activetedRoute.snapshot.params;
      this.code = model.code;

      // this.user = JSON.parse(localStorage.currentUser)

      if (this.code != "") {
        this.read();
        this.title = "แก้ไขข้อมูลสิทธิ์ผู้ใช้งาน";
      }
    });

    if (localStorage.getItem("category") != null) {
      this.category = JSON.parse(localStorage.getItem("category"));
    }

    this.paginationModel = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0,
      itemsPerPageString: "10",
    };
    this.paginationModelDiffer = this.differs
      .find(this.paginationModel)
      .create(); // <----- Pagination
  }

  create() {
    let isValid = false;

    if (this.editModel.title == "") {
      this.toastr.warning("กรุณาใส่หัวข้อ", "แจ้งเตือนระบบ", { timeOut: 2000 });
      isValid = true;
    }

    if (isValid) return;

    for (let index = 0; index < this.lvModel.length; index++) {
      if (index == 0) {
        this.editModel.lv0 = this.lvModel[index].lv0;
        this.editModel.lv1 = this.lvModel[index].lv1;
        this.editModel.lv2 = this.lvModel[index].lv2;
        this.editModel.lv3 = this.lvModel[index].lv3;
        this.editModel.lv4 = this.lvModel[index].lv4;
      } else {
        if (this.lvModel[index].lv0 != "")
          this.editModel.lv0 =
            this.editModel.lv0 + "," + this.lvModel[index].lv0;

        if (this.lvModel[index].lv1 != "")
          this.editModel.lv1 =
            this.editModel.lv1 + "," + this.lvModel[index].lv1;

        if (this.lvModel[index].lv2 != "")
          this.editModel.lv2 =
            this.editModel.lv2 + "," + this.lvModel[index].lv2;

        if (this.lvModel[index].lv3 != "")
          this.editModel.lv3 =
            this.editModel.lv3 + "," + this.lvModel[index].lv3;

        if (this.lvModel[index].lv4 != "")
          this.editModel.lv4 =
            this.editModel.lv4 + "," + this.lvModel[index].lv4;
      }
    }

    if (this.lvModel.length == 0) {
      this.editModel.lv0 = "";
      this.editModel.lv1 = "";
      this.editModel.lv2 = "";
      this.editModel.lv3 = "";
      this.editModel.lv4 = "";
    }

    this.spinner.show();

    this.serviceProviderService
      .postByPass("register/category/create", this.editModel)
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;

          if (model.status === "S") {
            this.messageInput.forEach((element) => {
              element.reference = model.objectData.code;
              this.serviceProviderService
                .postByPass("register/permission/create", element)
                .subscribe(
                  (data) => {},
                  (err) => {}
                );
            });

            this.spinner.hide();
            this.toastr.success("บันทึกข้อมูลสำเร็จ", "แจ้งเตือนระบบ", {
              timeOut: 1000,
            });
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.spinner.hide();
            this.toastr.warning(model.message, "แจ้งเตือนระบบ", {
              timeOut: 1000,
            });
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 1000 });
        }
      );
  }

  createOrganization() {
    this.lvModel.push({
      lv0: "",
      lv1: "",
      lv2: "",
      lv3: "",
      lv4: "",
      lv0Category: this.lv0Category,
    });
  }

  read() {
    this.serviceProviderService
      .postByPass("register/category/read", { code: this.code })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.editModel = model.objectData[0];

          console.log(" ==== ", this.editModel);

          setTimeout(() => {
            let lv0 = this.editModel.lv0.split(",");
            lv0.forEach((element) => {
              if (element != "")
                this.lvModel.push({
                  lv0: element,
                  lv0Category: this.lv0Category,
                });
              // this.lv0.push({ title: element, category: 'lv0' });
            });

            let lv1 = this.editModel.lv1.split(",");
            for (let index = 0; index < lv1.length; index++) {
              if (lv1 != "") this.lvModel[index].lv1 = lv1[index];
            }

            let lv2 = this.editModel.lv2.split(",");
            for (let index = 0; index < lv2.length; index++) {
              if (lv2 != "") this.lvModel[index].lv2 = lv2[index];
            }

            let lv3 = this.editModel.lv3.split(",");
            for (let index = 0; index < lv3.length; index++) {
              if (lv3 != "") this.lvModel[index].lv3 = lv3[index];
            }

            let lv4 = this.editModel.lv4.split(",");
            for (let index = 0; index < lv4.length; index++) {
              if (lv4 != "") this.lvModel[index].lv4 = lv4[index];
            }
          }, 2000);

          this.spinner.hide();

          this.serviceProviderService
            .postByPass("register/permission/read", { code: this.code })
            .subscribe(
              (data) => {
                let item: any;
                item = data;
                this.messageInput = item.objectData || [];

                this.messageInput.forEach((element) => {
                  if (element.newsPage)
                    element.title = element.newsCategoryList[0].title;
                  if (element.eventPage)
                    element.title = element.eventCategoryList[0].title;
                  if (element.policyPartyPage)
                    element.title = element.policyPartyCategoryList[0].title;
                  if (element.partyExecutivePage)
                    element.title = element.partyExecutiveCategoryList[0].title;
                  if (element.suggestionPage)
                    element.title = element.suggestionCategoryList[0].title;
                  if (element.donatePage)
                    element.title = element.donateCategoryList[0].title;
                });

                this.setLocalTable(0, 10);
              },
              (err) => {}
            );
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 1000 });
        }
      );
  }

  update() {
    let isValid = false;
    if (this.editModel.title == "") {
      this.toastr.warning("กรุณาใส่หัวข้อ", "แจ้งเตือนระบบ", { timeOut: 1000 });
      isValid = true;
    }

    if (isValid) return;

    for (let index = 0; index < this.lvModel.length; index++) {
      if (index == 0) {
        this.editModel.lv0 = this.lvModel[index].lv0;
        this.editModel.lv1 = this.lvModel[index].lv1;
        this.editModel.lv2 = this.lvModel[index].lv2;
        this.editModel.lv3 = this.lvModel[index].lv3;
        this.editModel.lv4 = this.lvModel[index].lv4;
      } else {
        if (this.lvModel[index].lv0 != "")
          this.editModel.lv0 =
            this.editModel.lv0 + "," + this.lvModel[index].lv0;

        if (this.lvModel[index].lv1 != "")
          this.editModel.lv1 =
            this.editModel.lv1 + "," + this.lvModel[index].lv1;

        if (this.lvModel[index].lv2 != "")
          this.editModel.lv2 =
            this.editModel.lv2 + "," + this.lvModel[index].lv2;

        if (this.lvModel[index].lv3 != "")
          this.editModel.lv3 =
            this.editModel.lv3 + "," + this.lvModel[index].lv3;

        if (this.lvModel[index].lv4 != "")
          this.editModel.lv4 =
            this.editModel.lv4 + "," + this.lvModel[index].lv4;
      }
    }

    if (this.lvModel.length == 0) {
      this.editModel.lv0 = "";
      this.editModel.lv1 = "";
      this.editModel.lv2 = "";
      this.editModel.lv3 = "";
      this.editModel.lv4 = "";
    }

    this.spinner.show();

    this.serviceProviderService
      .postByPass("register/category/update", this.editModel)
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;

          if (model.status === "S") {
            this.serviceProviderService
              .post("register/permission/delete", this.editModel)
              .subscribe(
                (data) => {
                  if (this.messageInput.length > 0) {
                    this.messageInput.forEach((element) => {
                      element.reference = model.objectData.code;
                      this.serviceProviderService
                        .post("register/permission/create", element)
                        .subscribe(
                          (data) => {},
                          (err) => {}
                        );
                    });
                  }
                },
                (err) => {}
              );

            this.spinner.hide();
            this.toastr.success("บันทึกข้อมูลสำเร็จ", "แจ้งเตือนระบบ", {
              timeOut: 1000,
            });
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.spinner.hide();
            this.toastr.warning(model.message, "แจ้งเตือนระบบ", {
              timeOut: 1000,
            });
          }
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err, "แจ้งเตือนระบบ", { timeOut: 1000 });
        }
      );
  }

  checkAllAction() {
    this.editModel.createAction = true;
    this.editModel.readAction = true;
    this.editModel.updateAction = true;
    this.editModel.deleteAction = true;
    this.editModel.approveAction = true;
  }

  checkAllPolicy() {
    this.editModel.policyApplicationPage = true;
    this.editModel.policyMarketingPage = true;
  }

  checkAllMemberPolicy() {
    this.editModel.memberMobilePolicyApplicationPage = true;
    this.editModel.memberMobilePolicyMarketingPage = true;
  }

  checkAllMember() {
    // this.editModel.organizationPage = true;
    this.editModel.userRolePage = true;
    this.editModel.memberPage = true;
    this.editModel.registerPage = true;
    this.editModel.registerMemberPage = true;
  }

  checkAllImage() {
    this.editModel.mainPopupPage = true;
    this.editModel.bannerPage = true;
    this.editModel.partnerPage = true;
    this.editModel.alliancePage = true;
    // this.editModel.officeActivitiesPage = true;
  }

  checkAllCategory() {
    this.editModel.newsCategoryPage = true;
    this.editModel.eventCategoryPage = true;
    this.editModel.policyPartyCategoryPage = true;
    this.editModel.partyExecutiveCategoryPage = true;
    this.editModel.suggestionCategoryPage = true;
    this.editModel.donateCategoryPage = true;
  }

  checkAllMain() {
    this.editModel.newsPage = true;
    this.editModel.eventPage = true;
    this.editModel.policyPartyPage = true;
    this.editModel.partyExecutivePage = true;
    this.editModel.suggestionPage = true;
    this.editModel.donatePage = true;
  }

  checkAllMaster() {
    this.editModel.swearWordsPage = true;
    this.editModel.masterVeterinaryPage = true;
    this.editModel.notificationResultPage = true;
    this.editModel.notificationExamPage = true;
    this.editModel.contentKeywordPage = true;
  }

  checkAllReportStatistical() {
    this.editModel.aboutCommentPage = true;
    this.editModel.websitevisitorPage = true;
    this.editModel.cmsvisitorPage = true;
    // this.editModel.dashboardPage = true;
    // this.editModel.reportMemberRegisterPage = true;
    // this.editModel.reportNumberMemberRegisterPage = true;
    // this.editModel.reportNewsPage = true;
    // this.editModel.reportKnowledgePage = true;
    // this.editModel.reportReporterCreatePage = true;
    // this.editModel.reportReporterPage = true;
    // this.editModel.reportContactPage = true;
    // this.editModel.reportEventCalendarPage = true;
    // this.editModel.reportPrivilegePage = true;
    // this.editModel.reportPoiPage = true;
    // this.editModel.reportPollPage = true;
    // this.editModel.reportExaminationPage = true;
    // this.editModel.reportWarningPage = true;
    // this.editModel.reportWelfarePage = true;
    // this.editModel.reportAboutUsPage = true;
    // this.editModel.reportNewsCategoryPage = true;
    // this.editModel.reportKnowledgeCategoryPage = true;
  }

  readNewsCategory() {
    this.serviceProviderService.post("m/news/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.newsCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readEventCategory() {
    this.serviceProviderService
      .post("m/eventCalendar/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.eventCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readPolicyPartyCategory() {
    this.serviceProviderService.post("m/policyParty/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.policyPartyCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readPartyExecutiveCategory() {
    this.serviceProviderService
      .post("m/partyExecutive/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.eventCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readSuggestionCategory() {
    this.serviceProviderService
      .post("m/suggestion/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.eventCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readDonateCategory() {
    this.serviceProviderService.post("m/donate/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.eventCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  deleteItem(param) {
    this.messageInput.splice(
      param +
        this.paginationModel.itemsPerPage *
          (this.paginationModel.currentPage - 1),
      1
    );
    this.setLocalTable(
      (this.paginationModel.currentPage - 1) *
        this.paginationModel.itemsPerPage,
      this.paginationModel.itemsPerPage +
        (this.paginationModel.currentPage - 1) *
          this.paginationModel.itemsPerPage
    );
  }

  chooseAllEvertThing() {
    if (this.editModel.newsPage) this.chooseAllNews();

    if (this.editModel.eventPage) this.chooseAllEvent();

    if (this.editModel.policyPartyPage) this.chooseAllPolicy();

    if (this.editModel.partyExecutivePage) this.chooseAllPartyExecutive();

    if (this.editModel.suggestionPage) this.chooseAllSuggestion();

    if (this.editModel.donatePage) this.chooseAllDonate();
  }

  async chooseAllNews() {
    await this.newsCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value &&
            item.page == "ข่าวสารและประชาสัมพันธ์"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ข่าวสารและประชาสัมพันธ์",
          category: element.value,
          title: element.display,
          newsPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllEvent() {
    await this.eventCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กิจกรรม",
          category: element.value,
          title: element.display,
          eventPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllPolicy() {
    await this.policyPartyCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กิจกรรม",
          category: element.value,
          title: element.display,
          policyPartyPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllPartyExecutive() {
    await this.partyExecutiveCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กิจกรรม",
          category: element.value,
          title: element.display,
          partyExecutivePage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllSuggestion() {
    await this.suggestionCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กิจกรรม",
          category: element.value,
          title: element.display,
          suggestionPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllDonate() {
    await this.donateCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กิจกรรม",
          category: element.value,
          title: element.display,
          donatePage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  chooseCategory(page, category, param) {
    if (category != "") {
      if (
        this.messageInput.findIndex(
          (item) => item.category == category && item.page == page
        ) === -1
      ) {
        if (param == "newsPage") {
          if (
            this.newsCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.newsCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.newsCategory[idx].display,
              newsPage: true,
            });
          }
        } else if (param == "eventPage") {
          if (
            this.eventCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.eventCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.eventCategory[idx].display,
              eventPage: true,
            });
          }
        } else if (param == "policyPartyPage") {
          if (
            this.policyPartyCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.policyPartyCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.policyPartyCategory[idx].display,
              policyPartyPage: true,
            });
          }
        } else if (param == "partyExecutivePage") {
          if (
            this.partyExecutiveCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.partyExecutiveCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.partyExecutiveCategory[idx].display,
              partyExecutivePage: true,
            });
          }
        } else if (param == "suggestionPage") {
          if (
            this.suggestionCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.suggestionCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.suggestionCategory[idx].display,
              suggestionPage: true,
            });
          }
        } else if (param == "donatePage") {
          if (
            this.donateCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.donateCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.donateCategory[idx].display,
              donatePage: true,
            });
          }
        }
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    }

    this.editModel.category = "";

    this.setLocalTable(0, 10);
  }

  readOrganization(param) {
    this.serviceProviderService
      .post("organization/read", { category: param })
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;

          model.objectData.forEach((element) => {
            if (param == "lv0")
              this.lv0Category.push({
                value: element.title,
                display: element.title,
              });
            else if (param == "lv1")
              this.lv1Category.push({
                value: element.title,
                display: element.title,
              });
            else if (param == "lv2")
              this.lv2Category.push({
                value: element.title,
                display: element.title,
              });
            else if (param == "lv3")
              this.lv3Category.push({
                value: element.title,
                display: element.title,
              });
            else if (param == "lv4")
              this.lv4Category.push({
                value: element.title,
                display: element.title,
              });
          });
        },
        (err) => {}
      );
  }

  chooseOrganization(param, category) {
    if (param != "") {
      if (category == "lv0") {
        if (
          this.lv0.findIndex(
            (item) => item.category == category && item.title == param
          ) === -1
        ) {
          this.lv0.splice(0, 0, { title: param, category: category });
        }
      } else if (category == "lv1") {
        if (
          this.lv1.findIndex(
            (item) => item.category == category && item.title == param
          ) === -1
        ) {
          this.lv1.splice(0, 0, { title: param, category: category });
        }
      } else if (category == "lv2") {
        if (
          this.lv2.findIndex(
            (item) => item.category == category && item.title == param
          ) === -1
        ) {
          this.lv2.splice(0, 0, { title: param, category: category });
        }
      } else if (category == "lv3") {
        if (
          this.lv3.findIndex(
            (item) => item.category == category && item.title == param
          ) === -1
        ) {
          this.lv3.splice(0, 0, { title: param, category: category });
        }
      } else if (category == "lv4") {
        if (
          this.lv4.findIndex(
            (item) => item.category == category && item.title == param
          ) === -1
        ) {
          this.lv4.splice(0, 0, { title: param, category: category });
        }
      }

      // console.log("element doesn't exist");
    } else {
      // console.log("element found");
    }
  }

  deleteOrganizationItem(param) {
    this.lvModel.splice(this.lvModel.indexOf(param), 1);

    // if (category == 'lv0')
    //   this.lv0.splice(param, 1);
    // else if (category == 'lv1')
    //   this.lv1.splice(param, 1);
    // else if (category == 'lv2')
    //   this.lv2.splice(param, 1);
    // else if (category == 'lv3')
    //   this.lv3.splice(param, 1);
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

  setPerPage(param) {
    this.paginationModel.currentPage = 1;
    this.paginationModel.itemsPerPage = parseInt(param); // <----- Pagination
    this.setLocalTable(
      this.paginationModel.currentPage - 1,
      this.paginationModel.itemsPerPage
    );
  }

  setLocalTable(skip, limit) {
    this.messageInputSlice = this.messageInput.slice(skip, limit);
    this.paginationModel.totalItems = this.messageInput.length - 1;

    if (
      skip + this.paginationModel.itemsPerPage >
      this.paginationModel.totalItems
    )
      this.paginationModel.textPage =
        this.paginationModel.totalItems != 0
          ? "แสดง " +
            (skip + 1) +
            " ถึง " +
            this.paginationModel.totalItems +
            " จาก " +
            this.paginationModel.totalItems +
            " แถว"
          : "แสดง 0 ถึง 0 จาก 0 แถว";
    else
      this.paginationModel.textPage =
        "แสดง " +
        (skip + 1) +
        " ถึง " +
        (skip + this.paginationModel.itemsPerPage) +
        " จาก " +
        this.paginationModel.totalItems +
        " แถว";
  }

  // <----- Pagination
  paginationModelChanged(changes: KeyValueChanges<string, any>) {
    // let skip = this.paginationModel.currentPage == 1 ? 0 : (this.paginationModel.currentPage * this.paginationModel.itemsPerPage) - this.paginationModel.itemsPerPage; // <----- Pagination

    let skip =
      this.paginationModel.currentPage == 1
        ? 0
        : this.paginationModel.currentPage - 1;
    let limit = this.paginationModel.itemsPerPage; // <----- Pagination
    this.setLocalTable(skip * limit, limit + skip * limit);
  }

  // <----- Pagination
  ngDoCheck(): void {
    const changes = this.paginationModelDiffer.diff(this.paginationModel);
    if (changes) {
      this.paginationModelChanged(changes);
    }
  }

  back() {
    this.router.navigate(["user-role"], { skipLocationChange: true });
  }
}
