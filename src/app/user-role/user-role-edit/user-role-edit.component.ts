import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { ServiceProviderService } from "./../../shared/service-provider.service";
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
  importantCategory: any = [];
  eventCategory: any = [];
  contactCategory: any = [];
  knowledgeCategory: any = [];
  knowledgeVetCategory: any = [];
  privilegeCategory: any = [];
  pollCategory: any = [];
  examinationCategory: any = [];
  reporterCategory: any = [];
  cooperativeFormCategory: any = [];
  imageEventCategory: any = [];
  eventAbroadCategory: any = [];
  vetEnewsCategory: any = [];
  lawCategory: any = [];
  expertBranchCategory: any = [];
  verifyApprovedUserCategory: any = [];
  trainingInstituteCategory: any = [];
  seminarCategory: any = [];
  productCategory: any = [];
  employeeCategory: any = [];
  certificateCategory: any = [];
  portfolioCategory: any = [];

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
    this.readImportantCategory();
    this.readEventCategory();
    this.readContactCategory();
    this.readKnowledgeCategory();
    this.readKnowledgeVetCategory();
    this.readPrivilegeCategory();
    this.readPollCategory();
    this.readExaminationCategory();
    this.readReporterCategory();
    this.readCooperativeFormCategory();
    this.readImageEventCategory();
    this.readEventAbroadCategory();
    this.readVetEnewsCategory();
    this.readLawCategory();
    this.readExpertBranchCategory();
    this.readVerifyApprovedUserCategory();
    this.readTrainingInstituteCategory();
    this.readSeminarCategory();
    this.readProductCategory();
    this.readEmployeeCategory();
    this.readCertificateCategory();
    this.readPortfolioCategory();

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
          // let lv1 = this.editModel.lv1.split(',');
          // lv1.forEach(element => {
          //   if (element != '')
          //   this.lvModel.push({ lv1: element });
          // });

          // let lv2 = this.editModel.lv2.split(',');
          // lv2.forEach(element => {
          //   if (element != '')
          //     this.lvModel.push({ lv2: element });
          // });

          // let lv3 = this.editModel.lv3.split(',');
          // lv3.forEach(element => {
          //   if (element != '')
          //     this.lvModel.push({ lv3: element });
          // });

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
                  if (element.importantPage)
                    element.title = element.importantCategoryList[0].title;
                  if (element.eventPage)
                    element.title = element.eventCategoryList[0].title;
                  if (element.contactPage)
                    element.title = element.contactCategoryList[0].title;
                  if (element.knowledgePage)
                    element.title = element.knowledgeCategoryList[0].title;
                  if (element.knowledgeVetPage)
                    element.title = element.knowledgeVetCategoryList[0].title;
                  if (element.privilegePage)
                    element.title = element.privilegeCategoryList[0].title;
                  if (element.poiPage)
                    element.title = element.poiCategoryList[0].title;
                  if (element.pollPage)
                    element.title = element.pollCategoryList[0].title;
                  if (element.notificationPage)
                    element.title = element.notificationCategoryList[0].title;
                  if (element.welfarePage)
                    element.title = element.welfareCategoryList[0].title;
                  if (element.trainingPage)
                    element.title = element.trainingCategoryList[0].title;
                  if (element.reporterPage)
                    element.title = element.reporterCategoryList[0].title;
                  if (element.warningPage)
                    element.title = element.warningCategoryList[0].title;
                  if (element.fundPage)
                    element.title = element.fundCategoryList[0].title;
                  if (element.cooperativeFormPage)
                    element.title =
                      element.cooperativeFormCategoryList[0].title;
                  if (element.examinationPage)
                    element.title = element.examinationCategoryList[0].title;
                  if (element.imageEventPage)
                    element.title = element.imageEventCategoryList[0].title;
                  if (element.eventAbroadPage)
                    element.title = element.eventAbroadCategoryList[0].title;
                  if (element.vetEnewsPage)
                    element.title = element.vetEnewsCategoryList[0].title;
                  if (element.lawPage)
                    element.title = element.lawCategoryList[0].title;
                  if (element.expertBranchPage)
                    element.title = element.expertBranchCategoryList[0].title;
                  if (element.VerifyApprovedUserPage)
                    element.title =
                      element.VerifyApprovedUserCategoryList[0].title;
                  if (element.trainingInstitutePage)
                    element.title =
                      element.trainingInstituteCategoryList[0].title;
                  if (element.seminarPage)
                    element.title = element.seminarCategoryList[0].title;
                  if (element.productPage)
                    element.title = element.productCategoryList[0].title;
                  if (element.employeePage)
                    element.title = element.employeeCategoryList[0].title;
                  if (element.certificatePage)
                    element.title = element.certificateCategoryList[0].title;
                  if (element.portfolioPage)
                    element.title = element.portfolioCategoryList[0].title;
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
    this.editModel.memberMobilePage = true;
    this.editModel.personnelStructurePage = true;
    this.editModel.personnelPage = true;
  }

  checkAllImage() {
    this.editModel.logoPage = true;
    this.editModel.splashPage = true;
    this.editModel.mainPopupPage = true;
    this.editModel.bannerPage = true;
    this.editModel.forceAdsPage = true;
    this.editModel.rotationPage = true;
    this.editModel.partnerPage = true;
    this.editModel.alliancePage = true;
    this.editModel.officeActivitiesPage = true;
  }

  checkAllCategory() {
    this.editModel.newsCategoryPage = true;
    this.editModel.importantCategoryPage = true;
    this.editModel.eventCategoryPage = true;
    this.editModel.contactCategoryPage = true;
    this.editModel.knowledgeCategoryPage = true;
    this.editModel.knowledgeVetCategoryPage = true;
    this.editModel.privilegeCategoryPage = true;
    this.editModel.poiCategoryPage = true;
    this.editModel.pollCategoryPage = true;
    this.editModel.examinationCategoryPage = true;
    this.editModel.lawCategoryPage = true;
    this.editModel.expertBranchCategoryPage = true;
    this.editModel.verifyApprovedUserCategoryPage = true;
    this.editModel.trainingInstituteCategoryPage = true;
    // this.editModel.notificationCategoryPage = true;
    // this.editModel.welfareCategoryPage = true;
    // this.editModel.trainingCategoryPage = true;
    this.editModel.reporterCategoryPage = true;
    // this.editModel.warningCategoryPage = true;
    // this.editModel.fundCategoryPage = true;
    this.editModel.cooperativeFormCategoryPage = true;
    this.editModel.imageEventCategoryPage = true;
    this.editModel.eventAbroadCategoryPage = true;
    this.editModel.vetEnewsCategoryPage = true;
    this.editModel.personnelStructureCategoryPage = true;
    this.editModel.personnelStructureCategoryPage2 = true;
    this.editModel.seminarCategoryPage = true;
    this.editModel.productCategoryPage = true;
    this.editModel.employeeCategoryPage = true;
    this.editModel.certificateCategoryPage = true;
    this.editModel.portfolioCategoryPage = true;
  }

  checkAllMain() {
    this.editModel.newsPage = true;
    this.editModel.eventPage = true;
    this.editModel.contactPage = true;
    this.editModel.knowledgePage = true;
    this.editModel.knowledgeVetPage = true;
    this.editModel.privilegePage = true;
    this.editModel.poiPage = true;
    this.editModel.pollPage = true;
    this.editModel.examinationPage = true;
    this.editModel.notificationPage = true;
    this.editModel.lawPage = true;
    this.editModel.expertBranchPage = true;
    // this.editModel.verifyApprovedUserPage = true;
    this.editModel.trainingInstitutePage = true;
    this.editModel.seminarPage = true;
    // this.editModel.welfarePage = true;
    // this.editModel.trainingPage = true;
    this.editModel.reporterPage = true;
    // this.editModel.warningPage = true;
    // this.editModel.fundPage = true;
    this.editModel.cooperativeFormPage = true;
    this.editModel.imageEventPage = true;
    this.editModel.eventAbroadPage = true;
    this.editModel.vetEnewsPage = true;
    this.editModel.importantPage = true;
    this.editModel.relateAgencyPage = true;

    this.editModel.employeePage = true;
    this.editModel.productPage = true;
    this.editModel.workProcessPage = true;
    this.editModel.portfolioPage = true;
    this.editModel.certificatePage = true;
  }

  checkAllMaster() {
    this.editModel.swearWordsPage = true;
    this.editModel.masterVeterinaryPage = true;
    this.editModel.notificationResultPage = true;
    this.editModel.notificationExamPage = true;
    this.editModel.contentKeywordPage = true;
  }

  checkAllReportAnalysis() {
    this.editModel.reportNewsKeysearchPage = true;
    this.editModel.reportEventCalendarKeysearchPage = true;
    this.editModel.reportPrivilegeKeysearchPage = true;
    this.editModel.reportPoiKeysearchPage = true;
    this.editModel.reportPollKeysearchPage = true;
    this.editModel.reportExaminationKeysearchPage = true;
    this.editModel.reportContactKeysearchPage = true;
    // this.editModel.reportWarningKeysearchPage = true;
    // this.editModel.reportWelfareKeysearchPage = true;
    this.editModel.reportKnowledgeKeysearchPage = true;
    // this.editModel.reportReporterKeysearchPage = true;
  }

  checkAllReportStatistical() {
    this.editModel.aboutCommentPage = true;
    this.editModel.websitevisitorPage = true;
    this.editModel.cmsvisitorPage = true;
    this.editModel.dashboardPage = true;
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
        console.log("model", model);
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

  readImportantCategory() {
    this.serviceProviderService.post("m/important/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("model", model);
        model.objectData.forEach((element) => {
          this.importantCategory.push({
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
          console.log("model", model);
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

  readContactCategory() {
    this.serviceProviderService.post("m/contact/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("model", model);
        model.objectData.forEach((element) => {
          this.contactCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readKnowledgeCategory() {
    this.serviceProviderService.post("m/knowledge/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("model", model);
        model.objectData.forEach((element) => {
          this.knowledgeCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readKnowledgeVetCategory() {
    this.serviceProviderService
      .post("m/knowledgeVet/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          console.log("model", model);
          model.objectData.forEach((element) => {
            this.knowledgeVetCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readPrivilegeCategory() {
    this.serviceProviderService.post("m/privilege/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("model", model);
        model.objectData.forEach((element) => {
          this.privilegeCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readPollCategory() {
    this.serviceProviderService.post("m/poll/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("model", model);
        model.objectData.forEach((element) => {
          this.pollCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readExaminationCategory() {
    this.serviceProviderService
      .post("m/examination/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          console.log("model", model);
          model.objectData.forEach((element) => {
            this.examinationCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readReporterCategory() {
    this.serviceProviderService.post("m/reporter/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("reporter", model);
        model.objectData.forEach((element) => {
          this.reporterCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readCooperativeFormCategory() {
    this.serviceProviderService
      .post("m/cooperativeForm/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          console.log("cooperativeForm", model);
          model.objectData.forEach((element) => {
            this.cooperativeFormCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readImageEventCategory() {
    this.serviceProviderService
      .post("m/imageEvent/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          console.log("imageEvent", model);
          model.objectData.forEach((element) => {
            this.imageEventCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readEventAbroadCategory() {
    this.serviceProviderService
      .post("m/eventAbroad/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          console.log("eventAbroad", model);
          model.objectData.forEach((element) => {
            this.eventAbroadCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readVetEnewsCategory() {
    this.serviceProviderService.post("m/vetEnews/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        console.log("vetEnews", model);
        model.objectData.forEach((element) => {
          this.vetEnewsCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readLawCategory() {
    this.serviceProviderService.post("m/law/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.lawCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readExpertBranchCategory() {
    this.serviceProviderService
      .post("m/expertBranch/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.expertBranchCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readVerifyApprovedUserCategory() {
    this.serviceProviderService
      .post("m/verifyApprovedUser/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.verifyApprovedUserCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readTrainingInstituteCategory() {
    this.serviceProviderService
      .post("m/trainingInstitute/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.trainingInstituteCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

  readSeminarCategory() {
    this.serviceProviderService.post("m/seminar/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.seminarCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readProductCategory() {
    this.serviceProviderService.post("m/product/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.productCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readEmployeeCategory() {
    this.serviceProviderService.post("m/employee/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.employeeCategory.push({
            value: element.code,
            display: element.title,
          });
        });
        // console.log('list', this.newCategory);
      },
      (err) => {}
    );
  }

  readCertificateCategory() {
    this.serviceProviderService
      .post("m/certificate/category/read", {})
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.objectData.forEach((element) => {
            this.certificateCategory.push({
              value: element.code,
              display: element.title,
            });
          });
          // console.log('list', this.newCategory);
        },
        (err) => {}
      );
  }

    readPortfolioCategory() {
    this.serviceProviderService.post("m/portfolio/category/read", {}).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        model.objectData.forEach((element) => {
          this.portfolioCategory.push({
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

    if (this.editModel.importantPage) this.chooseAllImportant();

    if (this.editModel.eventPage) this.chooseAllEvent();

    if (this.editModel.contactPage) this.chooseAllContact();

    if (this.editModel.knowledgePage) this.chooseAllKnowledge();

    if (this.editModel.knowledgeVetPage) this.chooseAllKnowledgeVet();

    if (this.editModel.privilegePage) this.chooseAllPrivilege();

    if (this.editModel.pollPage) this.chooseAllPoll();

    if (this.editModel.reporterPage) this.chooseAllReporter();

    if (this.editModel.cooperativeFormPage) this.chooseAllCooperativeForm();

    if (this.editModel.examinationPage) this.chooseAllExamination();

    if (this.editModel.imageEventPage) this.chooseAllImageEvent();

    if (this.editModel.eventAbroadPage) this.chooseAllEventAbroad();

    if (this.editModel.vetEnewsPage) this.chooseAllVetEnews();

    if (this.editModel.lawPage) this.chooseAllLaw();

    if (this.editModel.expertBranchPage) this.chooseAllExpertBranch();

    // if (this.editModel.verifyApprovedUserPage)
    //   this.chooseAllVerifyApprovedUser();

    if (this.editModel.trainingInstitutePage) this.chooseAllTrainingInstitute();

    if (this.editModel.seminarPage) this.chooseAllSeminar();

    if (this.editModel.productPage) this.chooseAllProduct();

    if (this.editModel.employeePage) this.chooseAllEmployee();

    if (this.editModel.certificatePage) this.chooseAllCertificate();

    if (this.editModel.portfolioPage) this.chooseAllPortfolio();
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

  async chooseAllImportant() {
    await this.importantCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value &&
            item.page == "ข้อมูลสำคัญสำหรับสมาชิก"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ข้อมูลสำคัญสำหรับสมาชิก",
          category: element.value,
          title: element.display,
          importantPage: true,
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

  async chooseAllContact() {
    await this.contactCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "เบอร์ติดต่อ"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "เบอร์ติดต่อ",
          category: element.value,
          title: element.display,
          contactPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllKnowledge() {
    await this.knowledgeCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "คลังเอกสาร"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "คลังเอกสาร",
          category: element.value,
          title: element.display,
          knowledgePage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllKnowledgeVet() {
    await this.knowledgeVetCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value && item.page == "สารสัตวแพทยสภา"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "สารสัตวแพทยสภา",
          category: element.value,
          title: element.display,
          knowledgeVetPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllPrivilege() {
    await this.privilegeCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value && item.page == "สิทธิประโยชน์"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "สิทธิประโยชน์",
          category: element.value,
          title: element.display,
          privilegePage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllPoll() {
    await this.pollCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "แบบสำรวจ"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "แบบสำรวจ",
          category: element.value,
          title: element.display,
          pollPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllExamination() {
    await this.examinationCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "แบบสำรวจ"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "แบบสำรวจ",
          category: element.value,
          title: element.display,
          examinationPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllImageEvent() {
    await this.imageEventCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "ภาพกิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ภาพกิจกรรม",
          category: element.value,
          title: element.display,
          imageEventPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllEventAbroad() {
    await this.eventAbroadCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "ภาพกิจกรรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ภาพกิจกรรม",
          category: element.value,
          title: element.display,
          eventAbroadPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllVetEnews() {
    await this.vetEnewsCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value && item.page == "สัตวแพทยสภาอีนิวส์"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "สัตวแพทยสภาอีนิวส์",
          category: element.value,
          title: element.display,
          vetEnewsPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllLaw() {
    await this.lawCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "กฎหมาย"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "กฎหมาย",
          category: element.value,
          title: element.display,
          lawPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllExpertBranch() {
    await this.expertBranchCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value &&
            item.page == "ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร",
          category: element.value,
          title: element.display,
          expertBranchPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  // async chooseAllVerifyApprovedUser() {
  //   await this.verifyApprovedUserCategory.forEach(element => {

  //     if (this.messageInput.findIndex(item => item.category == element.value && item.page == 'ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร') === -1) {
  //       this.messageInput.splice(0, 0, { page: 'ตรวจสอบรายชื่อผู้ได้รับอนุมัติบัตรและวุฒิบัตร', category: element.value, title: element.display, verifyApprovedUserPage: true });
  //       // console.log("element doesn't exist");
  //     }
  //     else {
  //       // console.log("element found");
  //     }

  //   });
  //   this.setLocalTable(0, 10);
  // }

  async chooseAllTrainingInstitute() {
    await this.trainingInstituteCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "การฝึกอบรม"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "การฝึกอบรม",
          category: element.value,
          title: element.display,
          trainingInstitutePage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllSeminar() {
    await this.seminarCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "สัมมนา"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "สัมมนา",
          category: element.value,
          title: element.display,
          seminarPage: true,
        });
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllProduct() {
    await this.productCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "ผลิตภัณฑ์"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ผลิตภัณฑ์",
          category: element.value,
          title: element.display,
          productPage: true,
        });
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllEmployee() {
    await this.employeeCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "พนักงาน"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "พนักงาน",
          category: element.value,
          title: element.display,
          employeePage: true,
        });
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllCertificate() {
    await this.certificateCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "ใบรับรอง"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ใบรับรอง",
          category: element.value,
          title: element.display,
          certificatePage: true,
        });
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllPortfolio() {
    await this.portfolioCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "ผลงาน"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ผลงาน",
          category: element.value,
          title: element.display,
          portfolioPage: true,
        });
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllReporter() {
    await this.reporterCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) => item.category == element.value && item.page == "รายงาน"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "รายงาน",
          category: element.value,
          title: element.display,
          reporterPage: true,
        });
        // console.log("element doesn't exist");
      } else {
        // console.log("element found");
      }
    });
    this.setLocalTable(0, 10);
  }

  async chooseAllCooperativeForm() {
    await this.cooperativeFormCategory.forEach((element) => {
      if (
        this.messageInput.findIndex(
          (item) =>
            item.category == element.value && item.page == "ดาวน์โหลดเอกสาร"
        ) === -1
      ) {
        this.messageInput.splice(0, 0, {
          page: "ดาวน์โหลดเอกสาร",
          category: element.value,
          title: element.display,
          cooperativeFormPage: true,
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
        }
        if (param == "importantPage") {
          if (
            this.importantCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.importantCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.importantCategory[idx].display,
              importantPage: true,
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
        } else if (param == "contactPage") {
          if (
            this.contactCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.contactCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.contactCategory[idx].display,
              contactPage: true,
            });
          }
        } else if (param == "knowledgePage") {
          if (
            this.knowledgeCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.knowledgeCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.knowledgeCategory[idx].display,
              knowledgePage: true,
            });
          }
        } else if (param == "knowledgeVetPage") {
          if (
            this.knowledgeVetCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.knowledgeVetCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.knowledgeVetCategory[idx].display,
              knowledgeVetPage: true,
            });
          }
        } else if (param == "privilegePage") {
          if (
            this.privilegeCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.privilegeCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.privilegeCategory[idx].display,
              privilegePage: true,
            });
          }
        } else if (param == "pollPage") {
          if (
            this.pollCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.pollCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.pollCategory[idx].display,
              pollPage: true,
            });
          }
        } else if (param == "examinationPage") {
          if (
            this.examinationCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.examinationCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.examinationCategory[idx].display,
              examinationPage: true,
            });
          }
        } else if (param == "reporterPage") {
          if (
            this.reporterCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.reporterCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.reporterCategory[idx].display,
              reporterPage: true,
            });
          }
        } else if (param == "cooperativeFormPage") {
          if (
            this.cooperativeFormCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.cooperativeFormCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.cooperativeFormCategory[idx].display,
              cooperativeFormPage: true,
            });
          }
        } else if (param == "imageEventPage") {
          if (
            this.imageEventCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.imageEventCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.imageEventCategory[idx].display,
              imageEventPage: true,
            });
          }
        } else if (param == "eventAbroadPage") {
          if (
            this.eventAbroadCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.eventAbroadCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.eventAbroadCategory[idx].display,
              eventAbroadPage: true,
            });
          }
        } else if (param == "vetEnewsPage") {
          if (
            this.vetEnewsCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.vetEnewsCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.vetEnewsCategory[idx].display,
              vetEnewsPage: true,
            });
          }
        } else if (param == "lawPage") {
          if (
            this.lawCategory.findIndex((item) => item.value == category) != -1
          ) {
            let idx = this.lawCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.lawCategory[idx].display,
              lawPage: true,
            });
          }
        } else if (param == "expertBranchPage") {
          if (
            this.expertBranchCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.expertBranchCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.expertBranchCategory[idx].display,
              expertBranchPage: true,
            });
          }
        }
        // else if (param == 'verifyApprovedUserPage') {
        //   if (this.verifyApprovedUserCategory.findIndex(item => item.value == category) != -1) {
        //     let idx = this.verifyApprovedUserCategory.findIndex(item => item.value == category);
        //     this.messageInput.splice(0, 0, { page: page, category: category, title: this.verifyApprovedUserCategory[idx].display, verifyApprovedUserPage: true });
        //   }
        // }
        else if (param == "trainingInstitutePage") {
          if (
            this.trainingInstituteCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.trainingInstituteCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.trainingInstituteCategory[idx].display,
              trainingInstitutePage: true,
            });
          }
        } else if (param == "seminarPage") {
          if (
            this.seminarCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.seminarCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.seminarCategory[idx].display,
              seminarPage: true,
            });
          }
        } else if (param == "productPage") {
          if (
            this.productCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.productCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.productCategory[idx].display,
              productPage: true,
            });
          }
        } else if (param == "employeePage") {
          if (
            this.employeeCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.employeeCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.employeeCategory[idx].display,
              employeePage: true,
            });
          }
        } else if (param == "certificatePage") {
          if (
            this.certificateCategory.findIndex(
              (item) => item.value == category
            ) != -1
          ) {
            let idx = this.certificateCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.certificateCategory[idx].display,
              certificatePage: true,
            });
          }
        } else if (param == "portfolioPage") {
          if (
            this.portfolioCategory.findIndex((item) => item.value == category) !=
            -1
          ) {
            let idx = this.portfolioCategory.findIndex(
              (item) => item.value == category
            );
            this.messageInput.splice(0, 0, {
              page: page,
              category: category,
              title: this.portfolioCategory[idx].display,
              portfolioPage: true,
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
