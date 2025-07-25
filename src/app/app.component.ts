import { Component } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ServiceProviderService } from "./shared/service-provider.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app works!";
  isLock: boolean = false;
  menuSummary: any;
  menuMember: any;
  menuImage: any;
  menuCategory: any;
  menuMain: any;
  menuPolicy: any = [];
  menuReport: any = [];
  menuMaster: any = [];
  menuAnalyze: any = [];
  menuWaitingManage: any = [];
  menuReport2: any = [];
  menuDemo: any;
  isLogin = true;
  isSignUp = false;
  model: any = { username: "", password: "" };
  listPrefixName: any = [];
  imageUrl: any = "app-assets/images/avatar/avatar-7.png";
  username: any = "unknow";
  category: any = {
    organizationPage: false,
    userRolePage: false,
    member: false,
    memberMobile: false,
    logoPage: false,
    splashPage: false,
    mainPopupPage: false,
    officeActivitiesPage: false,
    bannerPage: false,
    partnerPage: false,
    forceAdsPage: false,
    rotation: false,
    newCategoryPage: false,

    // poiCategoryPage: false,
    newPage: false,
    //report
    reportNewsPage: false,
    reportNewsCategoryPage: false,
  };

  og: any;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private serviceProviderService: ServiceProviderService,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem("token") != null) {
      this.isLogin = false;
      this.isSignUp = false;
      this.category = JSON.parse(localStorage.getItem("category"));
      this.imageUrl = localStorage.getItem("imageUrl");
      this.username = localStorage.getItem("username");
      this.og = JSON.parse(localStorage.getItem("organization"));

      if (this.username == "admin") {
      } else {
        this.serviceProviderService
          .post("register/organization/check", {})
          .subscribe(
            (data) => {
              let model: any = data;

              if (model.status == "E") {
                this.logout();
              } else {
                //get สิทธิ์แต่ละหน้าจอตรงนี้
                // [ { category: 'ทั่วไป', createAction: true, readAction: true, updateAction: true, deleteAction: true, approveAction: true }, { category: 'กีฬา', createAction: true, readAction: true, updateAction: true, deleteAction: true, approveAction: true } ]
                this.serviceProviderService
                  .post("register/page/read", { title: "newsPage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "newsPage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );

                // this.serviceProviderService
                //   .post("register/page/read", { title: "productPage" })
                //   .subscribe(
                //     (data) => {
                //       let model: any = data;
                //       localStorage.setItem(
                //         "productPage",
                //         JSON.stringify(model.objectData)
                //       );
                //     },
                //     (err) => {}
                //   );

                // this.serviceProviderService
                //   .post("register/page/read", { title: "portfolioPage" })
                //   .subscribe(
                //     (data) => {
                //       let model: any = data;
                //       localStorage.setItem(
                //         "portfolioPage",
                //         JSON.stringify(model.objectData)
                //       );
                //     },
                //     (err) => {}
                //   );

                // this.serviceProviderService
                //   .post("register/page/read", { title: "employeePage" })
                //   .subscribe(
                //     (data) => {
                //       let model: any = data;
                //       localStorage.setItem(
                //         "employeePage",
                //         JSON.stringify(model.objectData)
                //       );
                //     },
                //     (err) => {}
                //   );

                // this.serviceProviderService
                //   .post("register/page/read", { title: "certificatePage" })
                //   .subscribe(
                //     (data) => {
                //       let model: any = data;
                //       localStorage.setItem(
                //         "certificatePage",
                //         JSON.stringify(model.objectData)
                //       );
                //     },
                //     (err) => {}
                //   );

                // this.serviceProviderService
                //   .post("register/page/read", { title: "workProcessPage" })
                //   .subscribe(
                //     (data) => {
                //       let model: any = data;
                //       localStorage.setItem(
                //         "workProcessPage",
                //         JSON.stringify(model.objectData)
                //       );
                //     },
                //     (err) => {}
                //   );

                this.serviceProviderService
                  .post("register/page/read", { title: "eventPage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "eventPage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );

                this.serviceProviderService
                  .post("register/page/read", { title: "policyPartyPage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "policyPartyPage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );

                this.serviceProviderService
                  .post("register/page/read", { title: "partyExecutivePage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "partyExecutivePage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );

                this.serviceProviderService
                  .post("register/page/read", { title: "suggestionPage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "suggestionPage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );

                this.serviceProviderService
                  .post("register/page/read", { title: "donatePage" })
                  .subscribe(
                    (data) => {
                      let model: any = data;
                      localStorage.setItem(
                        "donatePage",
                        JSON.stringify(model.objectData)
                      );
                    },
                    (err) => {}
                  );
              }
            },
            (err) => {}
          );
      }
    }

    this.isLock = true;

    this.menuSummary = [
      {
        name: "หน้าแรก",
        routing: "",
        data: "",
        type: "N",
        isActive: true,
        isShow: true,
      },
      {
        name: "เกี่ยวกับเรา",
        routing: "/about-us",
        data: "",
        type: "N",
        isActive: false,
        isShow: true,
      },
    ];

    this.menuMember = [
      {
        name: "ข้อมูลส่วนตัว",
        routing: "/personal-info",
        data: "",
        type: "N",
        isActive: false,
        isShow: true,
      },
      {
        name: "การจัดการสิทธิ์ผู้ใช้งาน",
        routing: "/user-role",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.userRolePage,
      },
      {
        name: "จัดการผู้ดูแลระบบ",
        routing: "/member",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.memberPage,
      },
      {
        name: "จัดการสมาชิกพรรค",
        routing: "/party-members",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.partyMembersPage,
      },
      {
        name: "จัดกากแฟนคลับพรรค",
        routing: "/party-fan-club",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.partyFanClubPage,
      },
      // {
      //   'name': 'รายการขอแก้ไขข้อมูลสมาชิก',
      //   'routing': '/member-veterinary-approve',
      //   'data': '',
      //   'type': 'N',
      //   'isActive': false,
      //   'isShow': this.category.memberMobilePage
      // },
    ];

    this.menuImage = [
      {
        name: "โลโก้",
        routing: "/logo",
        data: "",
        type: "N",
        isActive: false,
        isShow: false, //this.category.logoPage
      },
      {
        name: "ภาพพักหน้าจอ",
        routing: "/splash",
        data: "",
        type: "N",
        isActive: false,
        isShow: false, //this.category.splashPage
      },
      {
        name: "ป้ายโฆษณาบังคับปิดหน้าหลัก",
        routing: "/main-popup",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.mainPopupPage,
      },
      {
        name: "ป้ายประชาสัมพันธ์",
        routing: "/banner",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.bannerPage,
      },
      {
        name: "ป้ายโฆษณาบังคับปิดเมนูย่อย",
        routing: "/force-ads",
        data: "",
        type: "N",
        isActive: false,
        isShow: false, //this.category.forceAdsPage
      },
      {
        name: "ป้ายโฆษณา",
        routing: "/rotation",
        data: "",
        type: "N",
        isActive: false,
        isShow: false, //this.category.rotationPage
      },
      {
        name: "ผู้สนับสนุน",
        routing: "/partner",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.partnerPage,
      },
      {
        name: "พันธมิตร",
        routing: "/alliance",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.alliancePage,
      },
      {
        name: "กิจกรรมภายในออฟฟิศ",
        routing: "/office-activities",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.officeActivitiesPage,
      },
    ];

    this.menuCategory = [
      {
        name: "หมวดหมู่ข่าวประชาสัมพันธ์",
        routing: "/news-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.newsCategoryPage,
      },
      {
        name: "หมวดหมู่ผลิตภัณฑ์",
        routing: "/product-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.productCategoryPage,
      },
      {
        name: "หมวดหมู่ผลงาน",
        routing: "/portfolio-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.portfolioCategoryPage,
      },
      {
        name: "หมวดหมู่พนักงาน",
        routing: "/employee-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.employeeCategoryPage,
      },
      {
        name: "หมวดหมู่ใบรับรอง",
        routing: "/certificate-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.certificateCategoryPage,
      },
      {
        name: "หมวดหมู่ปฏิทินกิจกรรม",
        routing: "/event-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.eventCategoryPage,
      },
      {
        name: "หมวดหมู่นโยบายพรรค",
        routing: "/policy-party-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.policyPartyCategoryPage,
      },
      {
        name: "หมวดหมู่กรรมการบริหารพรรค",
        routing: "/party-executive-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.partyExecutiveCategoryPage,
      },
      {
        name: "หมวดหมู่ข้อเสนอแนะ/ข้อแนะนำ",
        routing: "/suggestion-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.suggestionCategoryPage,
      },
      {
        name: "หมวดหมู่บริจาค",
        routing: "/donate-category",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.donateCategoryPage,
      },
    ];

    this.menuMain = [
      {
        name: "ข่าวประชาสัมพันธ์",
        routing: "/news",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.newsPage,
      },
      {
        name: "ผลิตภัณฑ์",
        routing: "/product",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.productPage,
      },
      {
        name: "ผลงาน",
        routing: "/portfolio",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.portfolioPage,
      },
      {
        name: "พนักงาน",
        routing: "/employee",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.employeePage,
      },
      {
        name: "กระบวนการทำงาน",
        routing: "/work-process",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.workProcessPage,
      },
      {
        name: "ใบรับรอง",
        routing: "/certificate",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.certificatePage,
      },
      {
        name: "ปฏิทินกิจกรรม",
        routing: "/event",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.eventPage,
      },
      {
        name: "นโยบายพรรค",
        routing: "/policy-party",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.policyPartyPage,
      },
      {
        name: "กรรมการบริหารพรรค",
        routing: "/party-executive",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.partyExecutivePage,
      },
      {
        name: "ข้อเสนอแนะ/ข้อแนะนำ",
        routing: "/suggestion",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.suggestionPage,
      },
      {
        name: "บริจาค",
        routing: "/donate",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.donatePage,
      },
    ];

    this.menuDemo = [
      {
        name: "routing",
        routing: "/demo-routing",
        data: "",
        type: "N",
        isActive: false,
      },
      {
        name: "routing-param",
        routing: "/demo-routing-param",
        data: 1,
        type: "P",
        isActive: false,
      },
      {
        name: "routing-params",
        routing: "/demo-routing-params",
        data: "x,y",
        type: "PS",
        isActive: false,
      },
      {
        name: "routing-object",
        routing: "/demo-routing-object",
        data: { name: "angular", company: "webuild" },
        type: "O",
        isActive: false,
      },
      {
        name: "file-upload",
        routing: "/demo-file-upload",
        data: "",
        type: "N",
        isActive: false,
      },
      {
        name: "modal",
        routing: "/demo-modal",
        data: "",
        type: "N",
        isActive: false,
      },
      {
        name: "spinner",
        routing: "/demo-spinner",
        data: "",
        type: "N",
        isActive: false,
      },
      {
        name: "toast",
        routing: "/demo-toast",
        data: "",
        type: "N",
        isActive: false,
      },
      {
        name: "datetimepicker",
        routing: "/demo-datetimepicker",
        data: "",
        type: "N",
        isActive: false,
      },
    ];

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

    this.menuPolicy = [
      ,
      {
        name: "จัดการนโยบายขั้นต้น",
        routing: "/policy-application",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.policyApplicationPage,
      },
      {
        name: "จัดการนโยบายการตลาด",
        routing: "/policy-marketing",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.policyMarketingPage,
      },
      {
        name: "สมาชิกตอบรับนโยบายขั้นต้น",
        routing: "/member-mobile-policy-application",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.memberMobilePolicyApplicationPage,
      },
      {
        name: "สมาชิกตอบรับนโยบายการตลาด",
        routing: "/member-mobile-policy-marketing",
        data: "",
        type: "N",
        isActive: false,
        isShow: this.category.memberMobilePolicyMarketingPage,
      },
    ];

    this.menuAnalyze = [
      {
        name: "รายงานคำค้นหาข่าวประชาสัมพันธ์",
        routing: "/report-news-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportNewsKeysearchPage,
      },
      // {
      //   'name': 'รายงานคำค้นหาสารWe Tech Makers',
      //   'routing': '/report-knowledge-keysearch',
      //   'data': '',
      //   'type': 'N',
      //   'isActive': false,
      //   // 'isShow': true
      //   'isShow': this.category.reportKnowledgeKeysearchPage
      // },
      {
        name: "รายงานคำค้นหาปฏิทินกิจกรรม",
        routing: "/report-event-calendar-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportEventCalendarKeysearchPage,
      },
      {
        name: "รายงานคำค้นหาเบอร์ติดต่อ",
        routing: "/report-contact-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportContactKeysearchPage,
      },
      {
        name: "รายงานคำค้นหาสิทธิประโยชน์",
        routing: "/report-privilege-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportPrivilegeKeysearchPage,
      },
      {
        name: "รายงานคำค้นหาแบบทดสอบ",
        routing: "/report-poll-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportPollKeysearchPage,
      },
      {
        name: "รายงานคำค้นหาข้อสอบ",
        routing: "/report-examination-keysearch",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.reportExaminationKeysearchPage,
      },
    ];

    this.menuReport = [
      {
        name: "รายงานผู้ติดต่อ",
        routing: "/about-comment",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.aboutCommentPage,
      },
      {
        name: "รายงานผู้เข้าชมเว็บไซต์ (สมาชิก)",
        routing: "/website-visitor",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.websitevisitorPage,
      },
      {
        name: "รายงานผู้เข้าชมเว็บไซต์ (บุคคลทั่วไป)",
        routing: "/website-visitor-guest",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.websitevisitorPage,
      },
      {
        name: "รายงานผู้เข้าชมเว็บ CMS",
        routing: "/cms-visitor",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.cmsvisitorPage,
      },
      // {
      //   'name': 'รายงานสมาชิก (Dashboard)',
      //   'routing': '/dashboard',
      //   'data': '',
      //   'type': 'N',
      //   'isActive': false,
      //   // 'isShow': true
      //   'isShow': this.category.dashboardPage
      // },
    ];

    this.menuMaster = [
      {
        name: "คำหยาบ",
        routing: "/swear-words",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.swearWordsPage,
      },
      {
        name: "รายชื่อสมาชิกสัตวแพทย์สภา",
        routing: "/master-veterinary",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.masterVeterinaryPage,
      },
      {
        name: "คำค้นหาหน้าหลัก",
        routing: "/content-keyword",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.contentKeywordPage,
      },
      {
        name: "ส่งแจ้งเตือนข้อสอบ",
        routing: "/notification-exam",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.notificationExamPage,
      },
      {
        name: "ส่งแจ้งเตือนหน่วยกิต",
        routing: "/notification-result",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: this.category.notificationResultPage,
      },
    ];

    this.menuWaitingManage = [
      {
        name: "coming soon",
        routing: "/coming-soon",
        data: "",
        type: "N",
        isActive: false,
        isShow: false,
        // 'isShow': this.category.comingSoonPage
      },
    ];

    this.menuReport2 = [
      {
        name: "Dashboard ข้อมูลสมาชิก",
        routing: "/dashboard",
        data: "",
        type: "N",
        isActive: false,
        // 'isShow': true
        isShow: true,
      },
    ];
  }

  ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();
    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 500);
  }

  goToRouting(param) {
    //disable highlight all menu

    this.menuSummary.forEach((c) => {
      c.isActive = false;
    });

    this.menuMember.forEach((c) => {
      c.isActive = false;
    });

    this.menuImage.forEach((c) => {
      c.isActive = false;
    });

    this.menuCategory.forEach((c) => {
      c.isActive = false;
    });

    this.menuMain.forEach((c) => {
      c.isActive = false;
    });

    this.menuPolicy.forEach((c) => {
      c.isActive = false;
    });

    this.menuDemo.forEach((c) => {
      c.isActive = false;
    });

    this.menuAnalyze.forEach((c) => {
      c.isActive = false;
    });

    this.menuReport.forEach((c) => {
      c.isActive = false;
    });

    this.menuMaster.forEach((c) => {
      c.isActive = false;
    });

    this.menuReport2.forEach((c) => {
      c.isActive = false;
    });

    //set menu active highlight
    param.isActive = true;

    //check type for go to router
    if (param.type == "N") {
      this.router.navigate([param.routing]);
    } else if (param.type == "P") {
      this.router.navigate([param.routing, param.data]);
    } else if (param.type == "PS") {
      let model = param.data.split(",");
      this.router.navigate([param.routing, model[0], model[1]], {
        skipLocationChange: true,
      });
    } else if (param.type == "O") {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: JSON.stringify(param.data),
        },
      };
      this.router.navigate([param.routing], navigationExtras);
    }
  }

  goToDemoRouting() {
    this.router.navigate(["/demo-routing"]);
  }

  goToDemoRoutingParam() {
    this.router.navigate(["/demo-routing-param", 1]);
  }

  goToDemoRoutingParams() {
    this.router.navigate(["/demo-routing-params", "x", "y"]);
  }

  goToDemoRoutingObject() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({ a: "a", b: "b" }),
      },
    };
    this.router.navigate(["/demo-routing-object"], navigationExtras);
  }

  login(username, password) {
    this.spinner.show();

    if (username == "admin" && password == "p@ssw0rd") {
      localStorage.setItem(
        "category",
        JSON.stringify({
          organizationPage: true,
          userRolePage: true,
          memberPage: true,
          personnelStructurePage: true,
          personnelPage: true,
          createAction: true,
          readAction: true,
          updateAction: true,
          deleteAction: true,
        })
      );
      localStorage.setItem("token", "token");
      localStorage.setItem("username", "admin");
      window.location.href = "";
    } else {
      this.serviceProviderService
        .post("register/login", { username: username, password: password })
        .subscribe(
          (data) => {
            this.spinner.hide();
            let model: any = {};
            model = data;

            if (model.status == "S") {
              this.serviceProviderService
                .post("register/system/read", { username: username })
                .subscribe(
                  (data) => {
                    let categoryModel: any = data;
                    if (categoryModel.objectData != null)
                      localStorage.setItem(
                        "category",
                        JSON.stringify(categoryModel.objectData)
                      );
                    else
                      localStorage.setItem(
                        "category",
                        JSON.stringify(this.category)
                      );

                    localStorage.setItem("token", model.jsonData);
                    localStorage.setItem("username", model.objectData.username);
                    localStorage.setItem("userCode", model.objectData.code);
                    localStorage.setItem("imageUrl", model.objectData.imageUrl);
                    localStorage.setItem("userCenter", model.objectData.center);

                    // <----- Get Organization List
                    this.serviceProviderService
                      .post("register/organization/read", {
                        username: username,
                      })
                      .subscribe(
                        (data) => {
                          this.spinner.hide();

                          let organizationModel: any = data;

                          if (organizationModel.objectData != null)
                            localStorage.setItem(
                              "organization",
                              JSON.stringify(organizationModel.objectData)
                            );

                          window.location.href = "";
                        },
                        (err) => {
                          this.spinner.hide();
                          this.toastr.error(err.message, "แจ้งเตือนระบบ", {
                            timeOut: 2000,
                          });
                        }
                      );
                    // -----> Get Organization List
                  },
                  (err) => {
                    this.spinner.hide();
                    this.toastr.error(err.message, "แจ้งเตือนระบบ", {
                      timeOut: 2000,
                    });
                  }
                );

              // setTimeout(() => {
              //   window.location.href = "";
              // }, 2000);

              // if (localStorage.getItem('hello') == null) {
              //   localStorage.setItem('hello', 'informative core');
              //   location.reload();
              // }
            } else if (model.status == "F") {
              this.spinner.hide();
              this.toastr.warning(model.message, "แจ้งเตือนระบบ", {
                timeOut: 2000,
              });
            } else {
              this.spinner.hide();
              this.toastr.error(model.message, "แจ้งเตือนระบบ", {
                timeOut: 2000,
              });
            }
          },
          (err) => {
            this.spinner.hide();
            this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
          }
        );
    }
  }

  showSignUp() {
    this.isSignUp = true;
  }

  hiddenSignUp() {
    this.model = {};
    this.isSignUp = false;
  }

  signUp(param) {
    let isValid = false;

    if (this.model.username == "") {
      this.toastr.warning("กรุณาใส่ชื่อผู้ใช้", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      isValid = true;
    }

    if (this.model.password == "") {
      this.toastr.warning("กรุณาใส่รหัสผ่าน", "แจ้งเตือนระบบ", {
        timeOut: 2000,
      });
      isValid = true;
    }

    if (this.model.image.length == 0) {
      this.toastr.warning("กรุณาใส่รูปภาพ", "แจ้งเตือนระบบ", { timeOut: 2000 });
      isValid = true;
    }

    if (isValid) return;

    this.spinner.show();
    this.model.imageUrl = this.model.image[0].imageUrl;
    this.serviceProviderService.post("register/member/create", param).subscribe(
      (data) => {
        let model: any = {};
        model = data;
        if (model.status === "S") {
          this.model = {};
          this.isSignUp = false;
          /** spinner ends after 5 seconds */
          this.spinner.hide();
          this.toastr.success("บันทึกข้อมูลสำเร็จ", "แจ้งเตือนระบบ", {
            timeOut: 1000,
          });
        } else {
          this.spinner.hide();
          this.toastr.error(model.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
      }
    );
  }

  permission(param) {
    if (param != undefined) {
      let filter = param.filter((c) => c.isShow);

      return filter;
    }

    return param;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("category");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("organization");

    localStorage.removeItem("newsPage");
    localStorage.removeItem("productPage");
    localStorage.removeItem("employeePage");
    localStorage.removeItem("workProcessPage");
    localStorage.removeItem("portfolioPage");
    localStorage.removeItem("certificatePage");

    localStorage.removeItem("eventPage");
    localStorage.removeItem("policyPartyPage");
    localStorage.removeItem("partyExecutivePage");
    localStorage.removeItem("suggestionPage");
    localStorage.removeItem("donatePage");

    window.location.href = "";
  }
}
