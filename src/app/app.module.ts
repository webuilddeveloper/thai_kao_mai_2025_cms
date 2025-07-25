import { DropzoneSingleFileComponent } from "./component/dropzone-single-file/dropzone-single-file.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRadioModule } from "@angular/material/radio";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { NgxDropzoneModule } from "ngx-dropzone";
import { GalleryModule } from "ng-gallery";
import { LightboxModule } from "ng-gallery/lightbox";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from "ngx-mat-datetime-picker";
import { MatIconModule } from "@angular/material/icon";
import {
  MatMomentDateModule,
  MomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RoutingComponent } from "./demo/routing/routing.component";
import { RoutingParamComponent } from "./demo/routing-param/routing-param.component";
import { RoutingParamsComponent } from "./demo/routing-params/routing-params.component";
import { RoutingObjectComponent } from "./demo/routing-object/routing-object.component";
import { FileUploadComponent } from "./demo/file-upload/file-upload.component";
import {
  ModalComponent,
  ModalDialogComponent,
  ModalAlertComponent,
} from "./demo/modal/modal.component";
import { SpinnerComponent } from "./demo/spinner/spinner.component";
import { ToastComponent } from "./demo/toast/toast.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NewsComponent } from "./news/news.component";
import { NewsCriteriaComponent } from "./news/news-criteria/news-criteria.component";
import { NewsEditComponent } from "./news/news-edit/news-edit.component";
import { SplashComponent } from "./splash/splash.component";
import { SplashListComponent } from "./splash/splash-list/splash-list.component";
import { SplashEditComponent } from "./splash/splash-edit/splash-edit.component";
import { SplashCriteriaComponent } from "./splash/splash-criteria/splash-criteria.component";
import { PersonalComponent } from "./personal/personal.component";
import { BannerComponent } from "./banner/banner.component";
import { BannerListComponent } from "./banner/banner-list/banner-list.component";
import { BannerCriteriaComponent } from "./banner/banner-criteria/banner-criteria.component";
import { BannerEditComponent } from "./banner/banner-edit/banner-edit.component";
import { DropZoneComponent } from "./demo/drop-zone/drop-zone.component";
import { MainPopupComponent } from "./main-popup/main-popup.component";
import { MainPopupCriteriaComponent } from "./main-popup/main-popup-criteria/main-popup-criteria.component";
import { MainPopupListComponent } from "./main-popup/main-popup-list/main-popup-list.component";
import { MainPopupEditComponent } from "./main-popup/main-popup-edit/main-popup-edit.component";
import { SelectOptionComponent } from "./demo/select-option/select-option.component";
import { InputTextComponent } from "./component/input-text/input-text.component";
import { ButtonComponent } from "./component/button/button.component";
import { NewsListComponent } from "./news/news-list/news-list.component";
import { ButtonEditComponent } from "./component/button-edit/button-edit.component";
import { ButtonViewComponent } from "./component/button-view/button-view.component";
import { ButtonDeleteComponent } from "./component/button-delete/button-delete.component";
import { DateFormatPipe } from "./date-format.pipe";
import { DatetimeFormatPipe } from "./datetime-format.pipe";
import { SelectOptionsComponent } from "./component/select-option/select-option.component";
import { TextAreaComponent } from "./component/text-area/text-area.component";
import { DropzoneSingleComponent } from "./component/dropzone-single/dropzone-single.component";
import { DropzoneMultiComponent } from "./component/dropzone-multi/dropzone-multi.component";
import { DropzoneMultiFileComponent } from "./component/dropzone-multi-file/dropzone-multi-file.component";
import { DatepickerComponent } from "./component/datepicker/datepicker.component";
import { CustomDatetimepickerComponent } from "./component/custom-datetimepicker/custom-datetimepicker.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { InputTextBorderComponent } from "./component/input-text-border/input-text-border.component";
import { SwitchComponent } from "./component/switch/switch.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CustomCheckboxComponent } from "./component/custom-checkbox/custom-checkbox.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { MatTabsModule } from "@angular/material/tabs";
import { DropzoneSingleLargeComponent } from "./component/dropzone-single-large/dropzone-single-large.component";
import { ButtonLargeComponent } from "./component/button-large/button-large.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MultiSelectedOptionComponent } from "./component/multi-selected-option/multi-selected-option.component";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { TextEditorComponent } from "./component/text-editor/text-editor.component";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { RotationComponent } from "./rotation/rotation.component";
import { RotationCriteriaComponent } from "./rotation/rotation-criteria/rotation-criteria.component";
import { RotationListComponent } from "./rotation/rotation-list/rotation-list.component";
import { RotationEditComponent } from "./rotation/rotation-edit/rotation-edit.component";
import { InputNumberComponent } from "./component/input-number/input-number.component";
import { NewsCategoryComponent } from "./news-category/news-category.component";
import { NewsCategoryCriteriaComponent } from "./news-category/news-category-criteria/news-category-criteria.component";
import { NewsCategoryListComponent } from "./news-category/news-category-list/news-category-list.component";
import { NewsCategoryEditComponent } from "./news-category/news-category-edit/news-category-edit.component";
import { MemberComponent } from "./member/member.component";
import { MemberListComponent } from "./member/member-list/member-list.component";
import { MemberCriteriaComponent } from "./member/member-criteria/member-criteria.component";
import { MemberEditComponent } from "./member/member-edit/member-edit.component";
import { UserRoleComponent } from "./user-role/user-role.component";
import { UserRoleCriteriaComponent } from "./user-role/user-role-criteria/user-role-criteria.component";
import { UserRoleEditComponent } from "./user-role/user-role-edit/user-role-edit.component";
import { UserRoleListComponent } from "./user-role/user-role-list/user-role-list.component";
import { LogoComponent } from "./logo/logo.component";
import { LogoEditComponent } from "./logo/logo-edit/logo-edit.component";
import { LogoListComponent } from "./logo/logo-list/logo-list.component";
import { LogoCriteriaComponent } from "./logo/logo-criteria/logo-criteria.component";
import { MemberMobileComponent } from "./member-mobile/member-mobile.component";
import { MemberMobileListComponent } from "./member-mobile/member-mobile-list/member-mobile-list.component";
import { MemberMobileEditComponent } from "./member-mobile/member-mobile-edit/member-mobile-edit.component";
import { MemberMobileCriteriaComponent } from "./member-mobile/member-mobile-criteria/member-mobile-criteria.component";
import { ReportNewsComponent } from "./report-news/report-news.component";
import { ReportNewsCriteriaComponent } from "./report-news/report-news-criteria/report-news-criteria.component";
import { ReportNewsListComponent } from "./report-news/report-news-list/report-news-list.component";
import { ReportReporterComponent } from "./report-reporter/report-reporter.component";
import { ReportReporterCriteriaComponent } from "./report-reporter/report-reporter-criteria/report-reporter-criteria.component";
import { ReportReporterListComponent } from "./report-reporter/report-reporter-list/report-reporter-list.component";
import { ReportAboutUsComponent } from "./report-about-us/report-about-us.component";
import { ReportAboutUsCriteriaComponent } from "./report-about-us/report-about-us-criteria/report-about-us-criteria.component";
import { ReportAboutUsListComponent } from "./report-about-us/report-about-us-list/report-about-us-list.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { ComingSoonCriteriaComponent } from "./coming-soon/coming-soon-criteria/coming-soon-criteria.component";
import { ComingSoonListComponent } from "./coming-soon/coming-soon-list/coming-soon-list.component";
import { ComingSoonEditComponent } from "./coming-soon/coming-soon-edit/coming-soon-edit.component";
import { ConfigVersionComponent } from "./config-version/config-version.component";
import { PartnerComponent } from "./partner/partner.component";
import { PartnerListComponent } from "./partner/partner-list/partner-list.component";
import { PartnerCriteriaComponent } from "./partner/partner-criteria/partner-criteria.component";
import { PartnerEditComponent } from "./partner/partner-edit/partner-edit.component";

import { CmsVisitorComponent } from "./cms-visitor/cms-visitor.component";
import { CmsVisitorEditComponent } from "./cms-visitor/cms-visitor-edit/cms-visitor-edit.component";
import { CmsVisitorListComponent } from "./cms-visitor/cms-visitor-list/cms-visitor-list.component";
import { CmsVisitorCriteriaComponent } from "./cms-visitor/cms-visitor-criteria/cms-visitor-criteria.component";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BoxApproveMemberComponent } from "./component/box-approve-member/box-approve-member.component";

import { WebsiteVisitorComponent } from "./website-visitor/website-visitor.component";
import { WebsiteVisitorEditComponent } from "./website-visitor/website-visitor-edit/website-visitor-edit.component";
import { WebsiteVisitorListComponent } from "./website-visitor/website-visitor-list/website-visitor-list.component";
import { WebsiteVisitorCriteriaComponent } from "./website-visitor/website-visitor-criteria/website-visitor-criteria.component";
import { WebsiteVisitorGuestComponent } from "./website-visitor-guest/website-visitor-guest.component";
import { WebsiteVisitorGuestEditComponent } from "./website-visitor-guest/website-visitor-guest-edit/website-visitor-guest-edit.component";
import { WebsiteVisitorGuestCriteriaComponent } from "./website-visitor-guest/website-visitor-guest-criteria/website-visitor-guest-criteria.component";
import { WebsiteVisitorGuestListComponent } from "./website-visitor-guest/website-visitor-guest-list/website-visitor-guest-list.component";
import { ProductComponent } from "./product/product.component";
import { ProductCriteriaComponent } from "./product/product-criteria/product-criteria.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { ProductEditComponent } from "./product/product-edit/product-edit.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductCategoryListComponent } from "./product-category/product-category-list/product-category-list.component";
import { ProductCategoryEditComponent } from "./product-category/product-category-edit/product-category-edit.component";
import { ProductCategoryCriteriaComponent } from "./product-category/product-category-criteria/product-category-criteria.component";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeListComponent } from "./employee/employee-list/employee-list.component";
import { EmployeeEditComponent } from "./employee/employee-edit/employee-edit.component";
import { EmployeeCriteriaComponent } from "./employee/employee-criteria/employee-criteria.component";
import { EmployeeCategoryComponent } from "./employee-category/employee-category.component";
import { EmployeeCategoryListComponent } from "./employee-category/employee-category-list/employee-category-list.component";
import { EmployeeCategoryEditComponent } from "./employee-category/employee-category-edit/employee-category-edit.component";
import { EmployeeCategoryCriteriaComponent } from "./employee-category/employee-category-criteria/employee-category-criteria.component";
import { WorkProcessComponent } from "./work-process/work-process.component";
import { WorkProcessListComponent } from "./work-process/work-process-list/work-process-list.component";
import { WorkProcessEditComponent } from "./work-process/work-process-edit/work-process-edit.component";
import { WorkProcessCriteriaComponent } from "./work-process/work-process-criteria/work-process-criteria.component";
import { WorkProcessCategoryComponent } from "./work-process-category/work-process-category.component";
import { WorkProcessCategoryListComponent } from "./work-process-category/work-process-category-list/work-process-category-list.component";
import { WorkProcessCategoryEditComponent } from "./work-process-category/work-process-category-edit/work-process-category-edit.component";
import { WorkProcessCategoryCriteriaComponent } from "./work-process-category/work-process-category-criteria/work-process-category-criteria.component";
import { OfficeActivitiesComponent } from "./office-activities/office-activities.component";
import { OfficeActivitiesListComponent } from "./office-activities/office-activities-list/office-activities-list.component";
import { OfficeActivitiesCriteriaComponent } from "./office-activities/office-activities-criteria/office-activities-criteria.component";
import { OfficeActivitiesEditComponent } from "./office-activities/office-activities-edit/office-activities-edit.component";
import { AboutCommentComponent } from "./about-comment/about-comment.component";
import { AboutCommentListComponent } from "./about-comment/about-comment-list/about-comment-list.component";
import { AllianceComponent } from "./alliance/alliance.component";
import { AllianceListComponent } from "./alliance/alliance-list/alliance-list.component";
import { AllianceEditComponent } from "./alliance/alliance-edit/alliance-edit.component";
import { AllianceCriteriaComponent } from "./alliance/alliance-criteria/alliance-criteria.component";
import { DashboardV2Component } from "./dashboard-v2/dashboard-v2.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPhotoEditorModule } from "ngx-photo-editor";
import { PhotoEditorComponent } from "./component/photo-editor/photo-editor.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { PortfolioCriteriaComponent } from "./portfolio/portfolio-criteria/portfolio-criteria.component";
import { PortfolioEditComponent } from "./portfolio/portfolio-edit/portfolio-edit.component";
import { PortfolioListComponent } from "./portfolio/portfolio-list/portfolio-list.component";
import { PortfolioCategoryComponent } from "./portfolio-category/portfolio-category.component";
import { PortfolioCategoryCriteriaComponent } from "./portfolio-category/portfolio-category-criteria/portfolio-category-criteria.component";
import { PortfolioCategoryEditComponent } from "./portfolio-category/portfolio-category-edit/portfolio-category-edit.component";
import { PortfolioCategoryListComponent } from "./portfolio-category/portfolio-category-list/portfolio-category-list.component";
import { CertificateComponent } from "./certificate/certificate.component";
import { CertificateListComponent } from "./certificate/certificate-list/certificate-list.component";
import { CertificateEditComponent } from "./certificate/certificate-edit/certificate-edit.component";
import { CertificateCriteriaComponent } from "./certificate/certificate-criteria/certificate-criteria.component";
import { CertificateCategoryComponent } from "./certificate-category/certificate-category.component";
import { CertificateCategoryListComponent } from "./certificate-category/certificate-category-list/certificate-category-list.component";
import { CertificateCategoryEditComponent } from "./certificate-category/certificate-category-edit/certificate-category-edit.component";
import { CertificateCategoryCriteriaComponent } from "./certificate-category/certificate-category-criteria/certificate-category-criteria.component";
import { PolicyPartyComponent } from "./policy-party/policy-party.component";
import { PolicyPartyCriteriaComponent } from "./policy-party/policy-party-criteria/policy-party-criteria.component";
import { PolicyPartyEditComponent } from "./policy-party/policy-party-edit/policy-party-edit.component";
import { PolicyPartyListComponent } from "./policy-party/policy-party-list/policy-party-list.component";
import { PolicyPartyCategoryComponent } from "./policy-party-category/policy-party-category.component";
import { PolicyPartyCategoryListComponent } from "./policy-party-category/policy-party-category-list/policy-party-category-list.component";
import { PolicyPartyCategoryEditComponent } from "./policy-party-category/policy-party-category-edit/policy-party-category-edit.component";
import { PolicyPartyCategoryCriteriaComponent } from "./policy-party-category/policy-party-category-criteria/policy-party-category-criteria.component";
import { PartyMembersComponent } from "./party-members/party-members.component";
import { PartyMembersCriteriaComponent } from "./party-members/party-members-criteria/party-members-criteria.component";
import { PartyMembersEditComponent } from "./party-members/party-members-edit/party-members-edit.component";
import { PartyMembersListComponent } from "./party-members/party-members-list/party-members-list.component";
import { EventCategoryComponent } from './event-category/event-category.component';
import { EventComponent } from './event/event.component';
import { EventCriteriaComponent } from './event/event-criteria/event-criteria.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventEditComponent } from './event/event-edit/event-edit.component';
import { EventCategoryListComponent } from './event-category/event-category-list/event-category-list.component';
import { EventCategoryEditComponent } from './event-category/event-category-edit/event-category-edit.component';
import { EventCategoryCriteriaComponent } from './event-category/event-category-criteria/event-category-criteria.component';
import { PartyFanClubComponent } from "./party-fan-club/party-fan-club.component";
import { PartyFanClubCriteriaComponent } from "./party-fan-club/party-fan-club-criteria/party-fan-club-criteria.component";
import { PartyFanClubEditComponent } from "./party-fan-club/party-fan-club-edit/party-fan-club-edit.component";
import { PartyFanClubListComponent } from "./party-fan-club/party-fan-club-list/party-fan-club-list.component";
import { SuggestionCategoryComponent } from "./suggestion-category/suggestion-category.component";
import { SuggestionCategoryCriteriaComponent } from "./suggestion-category/suggestion-category-criteria/suggestion-category-criteria.component";
import { SuggestionComponent } from "./suggestion/suggestion.component";
import { SuggestionCriteriaComponent } from "./suggestion/suggestion-criteria/suggestion-criteria.component";
import { SuggestionCategoryEditComponent } from "./suggestion-category/suggestion-category-edit/suggestion-category-edit.component";
import { SuggestionCategoryListComponent } from "./suggestion-category/suggestion-category-list/suggestion-category-list.component";
import { SuggestionListComponent } from "./suggestion/suggestion-list/suggestion-list.component";
import { SuggestionEditComponent } from "./suggestion/suggestion-edit/suggestion-edit.component";
import { DonateComponent } from './donate/donate.component';
import { DonateDetailsComponent } from './donate/donate-details/donate-details.component';
import { DonateCriteriaComponent } from './donate/donate-criteria/donate-criteria.component';
import { DonateListComponent } from './donate/donate-list/donate-list.component';
import { DonateCategoryComponent } from './donate-category/donate-category.component';
import { DonateCategoryCriteriaComponent } from './donate-category/donate-category-criteria/donate-category-criteria.component';
import { DonateCategoryEditComponent } from './donate-category/donate-category-edit/donate-category-edit.component';
import { DonateCategoryListComponent } from './donate-category/donate-category-list/donate-category-list.component';

export const DateFormat = {
  display: {
    dateInput: "MM/DD/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "MM/DD/YYYY",
    monthYearA11yLabel: "MMMM YYYY",
  },
};
@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    RoutingParamComponent,
    RoutingParamsComponent,
    RoutingObjectComponent,
    FileUploadComponent,
    ModalComponent,
    ModalDialogComponent,
    ModalAlertComponent,
    SpinnerComponent,
    ToastComponent,
    NewsComponent,
    NewsCriteriaComponent,
    NewsListComponent,
    NewsEditComponent,
    SplashComponent,
    SplashListComponent,
    SplashEditComponent,
    SplashCriteriaComponent,
    PersonalComponent,
    BannerComponent,
    BannerListComponent,
    BannerCriteriaComponent,
    BannerEditComponent,
    DropZoneComponent,
    MainPopupComponent,
    MainPopupCriteriaComponent,
    MainPopupListComponent,
    MainPopupEditComponent,
    SelectOptionComponent,
    InputTextComponent,
    ButtonComponent,
    ButtonEditComponent,
    ButtonViewComponent,
    ButtonDeleteComponent,
    DateFormatPipe,
    DatetimeFormatPipe,
    SelectOptionsComponent,
    TextAreaComponent,
    DropzoneSingleComponent,
    DropzoneMultiComponent,
    DropzoneMultiFileComponent,
    DatepickerComponent,
    CustomDatetimepickerComponent,
    InputTextBorderComponent,
    SwitchComponent,
    CustomCheckboxComponent,
    AboutUsComponent,
    DropzoneSingleLargeComponent,
    ButtonLargeComponent,
    DashboardComponent,
    MultiSelectedOptionComponent,
    TextEditorComponent,
    RotationComponent,
    RotationCriteriaComponent,
    RotationListComponent,
    RotationEditComponent,
    InputNumberComponent,
    NewsCategoryComponent,
    NewsCategoryCriteriaComponent,
    NewsCategoryListComponent,
    NewsCategoryEditComponent,
    MemberComponent,
    MemberListComponent,
    MemberCriteriaComponent,
    MemberEditComponent,
    UserRoleComponent,
    UserRoleCriteriaComponent,
    UserRoleEditComponent,
    UserRoleListComponent,
    LogoComponent,
    LogoEditComponent,
    LogoListComponent,
    LogoCriteriaComponent,
    MemberMobileComponent,
    MemberMobileListComponent,
    MemberMobileCriteriaComponent,
    MemberMobileEditComponent,
    DropzoneSingleFileComponent,
    ReportNewsComponent,
    ReportNewsListComponent,
    ReportNewsCriteriaComponent,
    ReportReporterComponent,
    ReportReporterCriteriaComponent,
    ReportReporterListComponent,
    ReportAboutUsComponent,
    ReportAboutUsCriteriaComponent,
    ReportAboutUsListComponent,
    ComingSoonComponent,
    ComingSoonCriteriaComponent,
    ComingSoonListComponent,
    ComingSoonEditComponent,
    ConfigVersionComponent,
    PartnerComponent,
    PartnerListComponent,
    PartnerCriteriaComponent,
    PartnerEditComponent,
    CmsVisitorComponent,
    CmsVisitorEditComponent,
    CmsVisitorListComponent,
    CmsVisitorCriteriaComponent,
    BoxApproveMemberComponent,
    WebsiteVisitorComponent,
    WebsiteVisitorEditComponent,
    WebsiteVisitorListComponent,
    WebsiteVisitorGuestComponent,
    WebsiteVisitorGuestEditComponent,
    WebsiteVisitorGuestCriteriaComponent,
    WebsiteVisitorGuestListComponent,
    ProductComponent,
    ProductCriteriaComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductCategoryComponent,
    ProductCategoryListComponent,
    ProductCategoryEditComponent,
    ProductCategoryCriteriaComponent,
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeEditComponent,
    EmployeeCriteriaComponent,
    EmployeeCategoryComponent,
    EmployeeCategoryListComponent,
    EmployeeCategoryEditComponent,
    EmployeeCategoryCriteriaComponent,
    WorkProcessComponent,
    WorkProcessListComponent,
    WorkProcessEditComponent,
    WorkProcessCriteriaComponent,
    WorkProcessCategoryComponent,
    WorkProcessCategoryListComponent,
    WorkProcessCategoryEditComponent,
    WorkProcessCategoryCriteriaComponent,
    OfficeActivitiesComponent,
    OfficeActivitiesCriteriaComponent,
    OfficeActivitiesListComponent,
    OfficeActivitiesEditComponent,
    AboutCommentComponent,
    AboutCommentListComponent,
    AllianceComponent,
    AllianceListComponent,
    AllianceEditComponent,
    AllianceCriteriaComponent,
    DashboardV2Component,
    PhotoEditorComponent,
    PortfolioComponent,
    PortfolioCriteriaComponent,
    PortfolioEditComponent,
    PortfolioListComponent,
    PortfolioCategoryComponent,
    PortfolioCategoryCriteriaComponent,
    PortfolioCategoryEditComponent,
    PortfolioCategoryListComponent,
    CertificateComponent,
    CertificateListComponent,
    CertificateEditComponent,
    CertificateCriteriaComponent,
    CertificateCategoryComponent,
    CertificateCategoryListComponent,
    CertificateCategoryEditComponent,
    CertificateCategoryCriteriaComponent,
    PolicyPartyComponent,
    PolicyPartyCriteriaComponent,
    PolicyPartyEditComponent,
    PolicyPartyListComponent,
    PolicyPartyCategoryComponent,
    PolicyPartyCategoryListComponent,
    PolicyPartyCategoryEditComponent,
    PolicyPartyCategoryCriteriaComponent,
    PartyMembersComponent,
    PartyMembersCriteriaComponent,
    PartyMembersEditComponent,
    PartyMembersListComponent,
    EventCategoryComponent,
    EventComponent,
    EventCriteriaComponent,
    EventListComponent,
    EventEditComponent,
    EventCategoryListComponent,
    EventCategoryEditComponent,
    EventCategoryCriteriaComponent,
    PartyFanClubComponent,
    PartyFanClubCriteriaComponent,
    PartyFanClubEditComponent,
    PartyFanClubListComponent,
    SuggestionComponent,
    SuggestionCriteriaComponent,
    SuggestionListComponent,
    SuggestionEditComponent,
    SuggestionCategoryComponent,
    SuggestionCategoryCriteriaComponent,
    SuggestionCategoryListComponent,
    SuggestionCategoryEditComponent,
    DonateComponent,
    DonateDetailsComponent,
    DonateCriteriaComponent,
    DonateListComponent,
    DonateCategoryComponent,
    DonateCategoryCriteriaComponent,
    DonateCategoryEditComponent,
    DonateCategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatMomentDateModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    NgxChartsModule,
    AngularEditorModule,
    CKEditorModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatRadioModule,
    GalleryModule,
    LightboxModule,
    NgbModule,
    NgxPhotoEditorModule,
    DragDropModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "th-TH" }],
  bootstrap: [AppComponent],
})
export class AppModule {}
