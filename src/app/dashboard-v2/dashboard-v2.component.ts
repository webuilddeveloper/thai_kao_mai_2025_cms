import { Component, OnInit } from "@angular/core";
import { ExcelService } from "../shared/excel.service";
import { ServiceProviderService } from "../shared/service-provider.service";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard-v2",
  templateUrl: "./dashboard-v2.component.html",
  styleUrls: ["./dashboard-v2.component.css"],
})
export class DashboardV2Component implements OnInit {
  model: any;
  modelregister: any;
  // modelregisterSex: any;
  modelregisterJob: any;
  modelregisterProvince: any;
  apiModel: any = [
    {
      display: "พรรคไทยก้าวใหม่",
      value: "https://www.thaikaomai.or.th/thai-kao-mai-api/",
    },
  ];
  api = "https://www.thaikaomai.or.th/thai-kao-mai-api/";
  criteriaModel: any = {};

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = "below";

  constructor(
    private serviceProviderService: ServiceProviderService,
    private excelService: ExcelService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  onSelect(event) {
    console.log(event);
  }

  onActivate(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    // this._callReadRegisterSex();
    this._callReadRegisterJob();
    this._callReadRegisterProvince();
  }

  //#region  _callReadRegisterSex
  single: any = [];
  view: any[] = [650, 400];
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  cardColor: string = "#232837";
  card: any = [];
  cardView: any[] = [300, 420];
  cardColorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  _callReadRegisterSex() {
    this.serviceProviderService
      .getUrl(this.api + "Dashboard/registerSex")
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          model.forEach((e) => {
            this.single.push({
              name: e.name,
              value: e.values,
            });
            this.card.push({
              name:
                e.name +
                " คิดเป็น " +
                (
                  (e.values / model.find((f) => f.name == "ทั้งหมด").values) *
                  100
                ).toFixed(2) +
                "%",
              value: e.values,
            });
          });
          this.single = [...this.single];
          this.card = [...this.card];
        },
        (err) => {
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }
  //#endregion

  //#region _callReadRegisterJob
  job: string = "ทั้งหมด";
  singleJob: any = [];
  viewJob: any[] = [650, 400];
  colorSchemeJob = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  cardColorJob: string = "#232837";
  cardJob: any = [];
  cardViewJob: any[] = [300, 420];
  cardColorSchemeJob = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  };
  _callReadRegisterJob() {
    this.singleJob = [];
    this.cardJob = [];
    this.serviceProviderService
      .getUrl(this.api + "Dashboard/registerJob")
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.viewJob = [innerWidth / 1.3, , 400];
          this.cardViewJob = [
            innerWidth / 1.3,
            (innerWidth / 90) * model.length,
          ];
          model.forEach((e) => {
            if (this.job == e.name) {
              return;
            }
            this.singleJob.push({
              name: e.name,
              value: e.values,
            });
            this.cardJob.push({
              name: e.name,
              // " คิดเป็น " +
              // (
              //   (e.values /
              //     model.find((f) => f.name == "ไม่ระบุอาชีพ").values) *
              //   100
              // ).toFixed(2) +
              // "%",
              value: e.values,
            });
          });

          this.singleJob = [...this.singleJob];
          this.cardJob = [...this.cardJob];
        },
        (err) => {
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }
  //#endregion

  //#region _callReadRegisterProvince
  // options
  province: string = "ทั้งหมด";
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = "จังหวัด";
  showYAxisLabel: boolean = true;
  xAxisLabel: string = "Population";
  singleProvince: any = [];
  viewProvince: any[] = [650, 400];
  // colorSchemeProvince = {
  //   domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"],
  // };
  cardColorProvince: string = "#232837";
  cardProvince: any = [];
  cardViewProvince: any[] = [1100, 1200];
  _callReadRegisterProvince() {
    this.singleProvince = [];
    this.cardProvince = [];
    this.serviceProviderService
      .getUrl(this.api + "Dashboard/registerProvince")
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          this.viewProvince = [
            innerWidth / 1.3,
            (innerWidth / 58) * model.length,
          ];
          this.cardViewProvince = [
            innerWidth / 1.3,
            (innerWidth / 90) * model.length,
          ];
          model.forEach((e) => {
            if (this.province == e.name) {
              return;
            }
            this.singleProvince.push({
              name: e.name,
              value: e.values,
            });
            this.cardProvince.push({
              name: e.name,
              // +
              // " คิดเป็น " +
              // (
              //   (e.values /
              //     model.find((f) => f.name == "ไม่ระบุจังหวัด").values) *
              //   100
              // ).toFixed(2) +
              // "%",
              value: e.values,
            });
          });

          this.singleProvince = [...this.singleProvince];
          this.cardProvince = [...this.cardProvince];
        },
        (err) => {
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }
  //#endregion

  export(): void {
    this.spinner.show();
    this.serviceProviderService
      .getUrl(this.api + "Dashboard/registerAll")
      .subscribe(
        (data) => {
          let model: any = {};
          model = data;
          let result: any = [];
          let number = 0;
          model.forEach((e) => {
            number++;
            // if (this.job == e.name || this.province == e.name) {
            //   return;
            // }
            if (e.name == "ข้อมูลอาชีพ" || e.name == "ข้อมูลจังหวัด") {
              result.push({});
              result.push({
                ลำดับ: e.name,
              });
              number = 0;
              return;
            }

            result.push({
              ลำดับ: number,
              ชื่อ: e.name,
              จำนวน: e.values,
            });
          });

          let txt =
            "ข้อมูลสมาชิก ณ วันที่ " +
            moment(Date.now()).format("DD-MM-YYYY HH:mm:ss");
          this.spinner.hide();
          this.excelService.exportAsExcelFile(result, txt);

          // this.excelService.exportAsExcelFile(result, this.appService.title);
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error(err.message, "แจ้งเตือนระบบ", { timeOut: 2000 });
        }
      );
  }

  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
}
