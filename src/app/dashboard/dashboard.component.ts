import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  // single: any[];
  single = [
    {
      "name": "IOS ",
      "value": 50
    },
    {
      "name": "Android",
      "value": 25
    },
    {
      "name": "iPad",
      "value": 15
    },
    {
      "name": "Tablet",
      "value": 10
    }
  ];

  single2 = [
    {
      "name": "เกี่ยวกับเรา",
      "value": 100
    },
    {
      "name": "ข่าวประชาสัมพันธ์",
      "value": 50
    },
    // {
    //   "name": "สารสัตวแพทยสภา",
    //   "value": 20
    // },
    {
      "name": "กิจกรรม",
      "value": 30
    },
    {
      "name": "สิทธิประโยชน์",
      "value": 60
    },
    {
      "name": "ข้อเสนอแนะ",
      "value": 10
    },
    {
      "name": "จุดที่น่าสนใจ",
      "value": 10
    },
    {
      "name": "แบบสำรวจ",
      "value": 10
    }
  ];

  multi = [
    {
      "name": "",
      "series": [
        {
          "name": "1990",
          "value": 62000000
        },
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }
      ]
    },
  
    {
      "name": "",
      "series": [
        {
          "name": "1990",
          "value": 250000000
        },
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        }
      ]
    },
  
    {
      "name": "",
      "series": [
        {
          "name": "1990",
          "value": 58000000
        },
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        }
      ]
    },
    {
      "name": "",
      "series": [
        {
          "name": "1990",
          "value": 57000000
        },
        {
          "name": "2010",
          "value": 62000000
        }
      ]
    }
  ];
  view: any[] = [1400, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  animations: boolean = true;
  cardColor: string = '#232837';

  legend: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#e57373', '#f06292', '#ba68c8', '#64b5f6', '#4db6ac', '#aed581', '#fff176', '#a1887f']
  };

  constructor() {
    // Object.assign(this, this.single);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    Object.assign(this, this.single);
  }

}
