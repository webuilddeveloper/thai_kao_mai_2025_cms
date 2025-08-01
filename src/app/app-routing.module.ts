import { LogoEditComponent } from "./logo/logo-edit/logo-edit.component";
import { LogoComponent } from "./logo/logo.component";
import { UserRoleEditComponent } from "./user-role/user-role-edit/user-role-edit.component";
import { UserRoleComponent } from "./user-role/user-role.component";
import { NewsCategoryEditComponent } from "./news-category/news-category-edit/news-category-edit.component";
import { NewsCategoryComponent } from "./news-category/news-category.component";
import { RotationEditComponent } from "./rotation/rotation-edit/rotation-edit.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FileUploadComponent } from "./demo/file-upload/file-upload.component";
import { SpinnerComponent } from "./demo/spinner/spinner.component";
import { ToastComponent } from "./demo/toast/toast.component";
import { SplashComponent } from "./splash/splash.component";
import { SplashEditComponent } from "./splash/splash-edit/splash-edit.component";
import { NewsComponent } from "./news/news.component";
import { PersonalComponent } from "./personal/personal.component";
import { BannerComponent } from "./banner/banner.component";
import { DropZoneComponent } from "./demo/drop-zone/drop-zone.component";
import { RotationComponent } from "./rotation/rotation.component";
import { MainPopupComponent } from "./main-popup/main-popup.component";
import { SelectOptionComponent } from "./demo/select-option/select-option.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { BannerEditComponent } from "./banner/banner-edit/banner-edit.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MainPopupEditComponent } from "./main-popup/main-popup-edit/main-popup-edit.component";
import { MemberComponent } from "./member/member.component";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";
import { MemberMobileComponent } from "./member-mobile/member-mobile.component";
import { MemberMobileEditComponent } from "./member-mobile/member-mobile-edit/member-mobile-edit.component";
import { ReportNewsComponent } from "./report-news/report-news.component";
import { ReportReporterComponent } from "./report-reporter/report-reporter.component";
import { ReportAboutUsComponent } from "./report-about-us/report-about-us.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { ComingSoonEditComponent } from "./coming-soon/coming-soon-edit/coming-soon-edit.component";
import { ConfigVersionComponent } from "./config-version/config-version.component";
import { PartnerComponent } from "./partner/partner.component";
import { PartnerEditComponent } from "./partner/partner-edit/partner-edit.component";
import { CmsVisitorComponent } from "./cms-visitor/cms-visitor.component";
import { WebsiteVisitorComponent } from "./website-visitor/website-visitor.component";
import { WebsiteVisitorGuestComponent } from "./website-visitor-guest/website-visitor-guest.component";
import { ProductComponent } from "./product/product.component";
import { ProductEditComponent } from "./product/product-edit/product-edit.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductCategoryEditComponent } from "./product-category/product-category-edit/product-category-edit.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeEditComponent } from "./employee/employee-edit/employee-edit.component";
import { EmployeeCategoryComponent } from "./employee-category/employee-category.component";
import { EmployeeCategoryEditComponent } from "./employee-category/employee-category-edit/employee-category-edit.component";
import { WorkProcessComponent } from "./work-process/work-process.component";
import { WorkProcessEditComponent } from "./work-process/work-process-edit/work-process-edit.component";
import { WorkProcessCategoryComponent } from "./work-process-category/work-process-category.component";
import { WorkProcessCategoryEditComponent } from "./work-process-category/work-process-category-edit/work-process-category-edit.component";
import { OfficeActivitiesComponent } from "./office-activities/office-activities.component";
import { OfficeActivitiesEditComponent } from "./office-activities/office-activities-edit/office-activities-edit.component";
import { AboutCommentComponent } from "./about-comment/about-comment.component";
import { AllianceComponent } from "./alliance/alliance.component";
import { AllianceEditComponent } from "./alliance/alliance-edit/alliance-edit.component";
import { DashboardV2Component } from "./dashboard-v2/dashboard-v2.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioEditComponent } from "./portfolio/portfolio-edit/portfolio-edit.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { CertificateEditComponent } from "./certificate/certificate-edit/certificate-edit.component";
import { CertificateCategoryComponent } from "./certificate-category/certificate-category.component";
import { CertificateCategoryEditComponent } from "./certificate-category/certificate-category-edit/certificate-category-edit.component";
import { PortfolioCategoryComponent } from "./portfolio-category/portfolio-category.component";
import { PortfolioCategoryEditComponent } from "./portfolio-category/portfolio-category-edit/portfolio-category-edit.component";
import { PolicyPartyComponent } from "./policy-party/policy-party.component";
import { PolicyPartyEditComponent } from "./policy-party/policy-party-edit/policy-party-edit.component";
import { PolicyPartyCategoryComponent } from "./policy-party-category/policy-party-category.component";
import { PolicyPartyCategoryEditComponent } from "./policy-party-category/policy-party-category-edit/policy-party-category-edit.component";
import { PartyMembersComponent } from "./party-members/party-members.component";
import { PartyMembersEditComponent } from "./party-members/party-members-edit/party-members-edit.component";
import { EventComponent } from "./event/event.component";
import { EventEditComponent } from "./event/event-edit/event-edit.component";
import { EventCategoryComponent } from "./event-category/event-category.component";
import { EventCategoryEditComponent } from "./event-category/event-category-edit/event-category-edit.component";
import { PartyFanClubEditComponent } from "./party-fan-club/party-fan-club-edit/party-fan-club-edit.component";
import { PartyFanClubComponent } from "./party-fan-club/party-fan-club.component";
import { SuggestionComponent } from "./suggestion/suggestion.component";
import { SuggestionEditComponent } from "./suggestion/suggestion-edit/suggestion-edit.component";
import { SuggestionCategoryComponent } from "./suggestion-category/suggestion-category.component";
import { SuggestionCategoryEditComponent } from "./suggestion-category/suggestion-category-edit/suggestion-category-edit.component";
import { DonateComponent } from "./donate/donate.component";
import { DonateDetailsComponent } from "./donate/donate-details/donate-details.component";
import { PartyExecutiveComponent } from "./party-executive/party-executive.component";
import { PartyExecutiveEditComponent } from "./party-executive/party-executive-edit/party-executive-edit.component";
import { PartyExecutiveCategoryComponent } from "./party-executive-category/party-executive-category.component";
import { PartyExecutiveCategoryEditComponent } from "./party-executive-category/party-executive-category-edit/party-executive-category-edit.component";
import { DonateCategoryComponent } from "./donate-category/donate-category.component";
import { DonateCategoryEditComponent } from "./donate-category/donate-category-edit/donate-category-edit.component";

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "dashboard", component: DashboardV2Component },
  { path: "demo-file-upload", component: FileUploadComponent },
  { path: "demo-spinner", component: SpinnerComponent },
  { path: "demo-toast", component: ToastComponent },
  { path: "demo-drop-zone", component: DropZoneComponent },
  { path: "demo-select-option", component: SelectOptionComponent },
  { path: "splash", component: SplashComponent },
  { path: "splash-edit/:code", component: SplashEditComponent },
  { path: "news", component: NewsComponent },
  { path: "news-edit/:code", component: NewsEditComponent },
  { path: "personal-info", component: PersonalComponent },
  { path: "banner", component: BannerComponent },
  { path: "banner-edit/:code", component: BannerEditComponent },
  { path: "rotation", component: RotationComponent },
  { path: "rotation-edit/:code", component: RotationEditComponent },
  { path: "main-popup", component: MainPopupComponent },
  { path: "main-popup-edit/:code", component: MainPopupEditComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "news-category", component: NewsCategoryComponent },
  { path: "news-category-edit/:code", component: NewsCategoryEditComponent },
  { path: "member", component: MemberComponent },
  { path: "member-edit/:code", component: MemberEditComponent },
  { path: "member-mobile", component: MemberMobileComponent },
  { path: "member-mobile-edit/:code", component: MemberMobileEditComponent },
  { path: "user-role", component: UserRoleComponent },
  { path: "user-role-edit/:code", component: UserRoleEditComponent },
  { path: "logo", component: LogoComponent },
  { path: "logo-edit/:code", component: LogoEditComponent },
  { path: "report-news", component: ReportNewsComponent },
  { path: "report-reporter", component: ReportReporterComponent },
  { path: "report-about-us", component: ReportAboutUsComponent },
  { path: "coming-soon", component: ComingSoonComponent },
  { path: "coming-soon-edit/:code", component: ComingSoonEditComponent },
  { path: "config-version", component: ConfigVersionComponent },
  { path: "partner", component: PartnerComponent },
  { path: "partner-edit/:code", component: PartnerEditComponent },
  { path: "cms-visitor", component: CmsVisitorComponent },
  { path: "website-visitor", component: WebsiteVisitorComponent },
  { path: "website-visitor-guest", component: WebsiteVisitorGuestComponent },
  { path: "product", component: ProductComponent },
  { path: "product-edit/:code", component: ProductEditComponent },
  { path: "product-category", component: ProductCategoryComponent },
  {
    path: "product-category-edit/:code",
    component: ProductCategoryEditComponent,
  },
  { path: "employee", component: EmployeeComponent },
  { path: "employee-edit/:code", component: EmployeeEditComponent },
  { path: "employee-category", component: EmployeeCategoryComponent },
  {
    path: "employee-category-edit/:code",
    component: EmployeeCategoryEditComponent,
  },
  { path: "work-process", component: WorkProcessComponent },
  { path: "work-process-edit/:code", component: WorkProcessEditComponent },
  { path: "work-process-category", component: WorkProcessCategoryComponent },
  {
    path: "work-process-category-edit/:code",
    component: WorkProcessCategoryEditComponent,
  },
  { path: "office-activities", component: OfficeActivitiesComponent },
  {
    path: "office-activities-edit/:code",
    component: OfficeActivitiesEditComponent,
  },
  { path: "about-comment", component: AboutCommentComponent },
  { path: "alliance", component: AllianceComponent },
  { path: "alliance-edit/:code", component: AllianceEditComponent },

  { path: "portfolio", component: PortfolioComponent },
  { path: "portfolio-edit/:code", component: PortfolioEditComponent },
  { path: "portfolio-category", component: PortfolioCategoryComponent },
  {
    path: "portfolio-category-edit/:code",
    component: PortfolioCategoryEditComponent,
  },

  { path: "certificate", component: CertificateComponent },
  { path: "certificate-edit/:code", component: CertificateEditComponent },
  { path: "certificate-category", component: CertificateCategoryComponent },
  {
    path: "certificate-category-edit/:code",
    component: CertificateCategoryEditComponent,
  },
  { path: "policy-party", component: PolicyPartyComponent },
  { path: "policy-party-edit/:code", component: PolicyPartyEditComponent },
  { path: "policy-party-category", component: PolicyPartyCategoryComponent },
  {
    path: "policy-party-category-edit/:code",
    component: PolicyPartyCategoryEditComponent,
  },

  { path: "party-members", component: PartyMembersComponent },
  { path: "party-members-edit/:code", component: PartyMembersEditComponent },
  { path: "event", component: EventComponent },
  { path: "event-edit/:code", component: EventEditComponent },
  { path: "event-category", component: EventCategoryComponent },
  { path: "event-category-edit/:code", component: EventCategoryEditComponent },

  { path: "party-fan-club", component: PartyFanClubComponent },
  { path: "party-fan-club-edit/:code", component: PartyFanClubEditComponent },

  { path: "suggestion", component: SuggestionComponent },
  { path: "suggestion-edit/:code", component: SuggestionEditComponent },
  { path: "suggestion-category", component: SuggestionCategoryComponent },
  {
    path: "suggestion-category-edit/:code",
    component: SuggestionCategoryEditComponent,
  },
  { path: "donate", component: DonateComponent },
  {
    path: "donate-details/:code",
    component: DonateDetailsComponent,
  },
  { path: "donate-category", component: DonateCategoryComponent },
  {
    path: "donate-category-edit/:code",
    component: DonateCategoryEditComponent,
  },


  { path: "party-executive", component: PartyExecutiveComponent },
  { path: "party-executive-edit/:code", component: PartyExecutiveEditComponent },
  {
    path: "party-executive-category",
    component: PartyExecutiveCategoryComponent,
  },
  {
    path: "party-executive-category-edit/:code",
    component: PartyExecutiveCategoryEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
