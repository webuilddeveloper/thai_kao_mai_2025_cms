import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ServiceProviderService {
  // ng build --base-href "/td-vet-font/" --prod

  // server: string = 'http://localhost:8600/';
  // server: string = 'https://122.155.223.63/td-webuild-api/';
  server: string = "https://www.thaikaomai.or.th/thai-kao-mai-api/";
  //dev
  // server: string = 'https://vet.we-builds.com/vet-api/';
  //product
  // server: string = 'https://vetweb.we-builds.com/thai-kao-mai-api/';

  constructor(private http: HttpClient) {}

  get(url) {
    return this.http.get(url);
  }

  post(url, param) {
    // let server = 'https://localhost:5001/';
    // let server = 'https://122.155.223.63/td-ddpm-api/';

    if (localStorage.getItem("username") != null) {
      param.imageUrlCreateBy = localStorage.getItem("imageUrl");
      // param.createBy = localStorage.getItem('username');
      param.updateBy = localStorage.getItem("username");
    }

    if (localStorage.getItem("category") != null) {
      let model = JSON.parse(localStorage.getItem("category"));

      if (param.organization != "manual") {
        param.lv0 = model.lv0;
        param.lv1 = model.lv1;
        param.lv2 = model.lv2;
        param.lv3 = model.lv3;
        param.lv4 = model.lv4;
      }

      // else if (param.organization == 'lv0') {
      //   param.lv0 = model.lv0;
      // }
      // else if (param.organization == 'lv1') {
      //   param.lv0 = model.lv0;
      //   param.lv1 = model.lv1;
      // }
      // else if (param.organization == 'lv2') {
      //   param.lv0 = model.lv0;
      //   param.lv1 = model.lv1;
      //   param.lv2 = model.lv2;
      // }
      // else if (param.organization == 'lv3') {
      //   param.lv0 = model.lv0;
      //   param.lv1 = model.lv1;
      //   param.lv2 = model.lv2;
      //   param.lv3 = model.lv3;
      // }
      // else if (param.organization == 'lv3') {

      // }
      // else
      // {
      //   param.lv0 = model.lv0;
      //   param.lv1 = model.lv1;
      //   param.lv2 = model.lv2;
      //   param.lv3 = model.lv3;
      // }
    }

    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    // let options = new RequestOptions();
    // options.headers = headers;
    param.organization = JSON.parse(localStorage.getItem("organization"));
    return this.http.post(this.server + url, param, { headers: headers });
  }

  getUrl(url) {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    return this.http.get(url, { headers: headers });
  }

  postStatistics(url, param) {
    // let server = 'https://202.139.196.8/statistic-api/statistics/';
    let server = "https://vet.we-builds.com/statistic-api/statistics/";
    // let server = 'https://localhost:6100/statistics/';
    // let server = 'https://122.155.223.63/td-statistics-api/statistics/';
    param.databaseName = "vet_prod_statistics";

    if (localStorage.getItem("username") != null) {
      param.imageUrlCreateBy = localStorage.getItem("imageUrl");
      param.updateBy = localStorage.getItem("username");
    }

    if (localStorage.getItem("category") != null) {
      let model = JSON.parse(localStorage.getItem("category"));

      if (param.organization != "manual") {
        param.lv0 = model.lv0;
        param.lv1 = model.lv1;
        param.lv2 = model.lv2;
        param.lv3 = model.lv3;
        param.lv4 = model.lv4;
      }
    }

    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    // let options = new RequestOptions();
    // options.headers = headers;
    param.organization = JSON.parse(localStorage.getItem("organization"));
    return this.http.post(server + url, param, { headers: headers });
  }

  postByPass(url, param) {
    // let server = 'https://localhost:5001/';
    // let server = 'https://122.155.223.63/td-ddpm-api/';

    if (localStorage.getItem("username") != null) {
      param.imageUrlCreateBy = localStorage.getItem("imageUrl");
      param.createBy = localStorage.getItem("username");
      param.updateBy = localStorage.getItem("username");
    }

    // if (localStorage.getItem('category') != null) {
    //   let model = JSON.parse(localStorage.getItem('category'));
    //   param.lv0 = model.lv0;
    //   param.lv1 = model.lv1;
    //   param.lv2 = model.lv2;
    //   param.lv3 = model.lv3;
    // }

    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    // let options = new RequestOptions();
    // options.headers = headers;
    return this.http.post(this.server + url, param, { headers: headers });
  }

  postLineAuth(url, param) {
    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    return this.http.post("https://api.line.me/oauth2/v2.1/token", param);
  }
  postStatisticsV2(url, param) {
    if (localStorage.getItem("username") != null) {
      param.imageUrlCreateBy = localStorage.getItem("imageUrl");
      param.updateBy = localStorage.getItem("username");
    }

    if (localStorage.getItem("category") != null) {
      let model = JSON.parse(localStorage.getItem("category"));

      if (param.organization != "manual") {
        param.lv0 = model.lv0;
        param.lv1 = model.lv1;
        param.lv2 = model.lv2;
        param.lv3 = model.lv3;
        param.lv4 = model.lv4;
      }
    }

    let headers = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    // let options = new RequestOptions();
    // options.headers = headers;
    param.organization = JSON.parse(localStorage.getItem("organization"));
    return this.http.post(this.server + "statistics/" + url, param, {
      headers: headers,
    });
  }

  SendIPAddress(page) {
    this.http.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.post("ip/createCms", {
        ipAddress: res.ip,
        page: page,
        userName: localStorage.getItem("username") ?? "",
      }).subscribe();
    });
  }
}
