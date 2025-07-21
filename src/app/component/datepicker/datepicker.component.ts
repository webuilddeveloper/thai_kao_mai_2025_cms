// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import * as moment from 'moment';

// @Component({
//   selector: 'cdp',
//   templateUrl: './datepicker.component.html',
//   styleUrls: ['./datepicker.component.css']
// })
// export class DatepickerComponent implements OnInit {

//   @Input() label;
//   @Input() data = '';
//   @Input() dateControl = new FormControl(moment().format('YYYYMMDD'));
//   @Output() cModel = new EventEmitter<any>();

//   constructor() { }

//   ngOnInit(): void {

//     if (this.data == undefined || this.data == '')
//       this.data = ''; //this.dateControl.value;

//     this.cModel.emit(this.data);
//   }

//   emit(param) {
//     this.cModel.emit(moment(param).format('YYYYMMDD') || '');
//   }

// }
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

/** @title Datepicker with custom calendar header */
@Component({
  selector: 'cdp',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  ccHeader = CcHeader;

  @Input() label;
  @Input() data = '';
  @Input() dateControl = new FormControl(moment().format('YYYYMMDD'));
  @Output() cModel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {

    if (this.data == undefined || this.data == '')
      this.data = ''; //this.dateControl.value;

    this.cModel.emit(this.data);
  }

  emit(param) {
    this.cModel.emit(moment(param).format('YYYYMMDD') || '');
  }
}

/** Custom header component for datepicker. */
@Component({
  selector: 'cc-header',
  styles: [
    `
    .cc-header {
      display: flex;
      align-items: center;
      padding: 1.5em 0.5em;
    }

    .cc-header-label {
      flex: 1;
      height: 1em;
      font-weight: 500;
      text-align: center;
      font-size: 18px;
    }

    .cc-double-arrow {
      width:10px
    }

    .box-arrow-double {
      display:flex;
      width: 30px;
      background: #f7f7f7;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 10px;
    }

    .box-arrow-double:hover {
      background: #c7c7c7;
    }
      
    .box-arrow {
      display:flex;
      width: 20px;
      background: #f7f7f7;
      border-radius: 5px;
      cursor: pointer;
    }

    .box-arrow:hover {
      background: #c7c7c7;
    }
  `,
  ],
  template: `

  <div class="cc-header">
  <div class="box-arrow-double" (click)="previousClicked('year')">
  <i class="material-icons cc-double-arrow">keyboard_arrow_left</i>
  <i class="material-icons cc-double-arrow">keyboard_arrow_left</i>
  </div>
  <div class="box-arrow-double" (click)="previousClicked('month')">
    <i class="material-icons cc-double-arrow">keyboard_arrow_left</i>
  </div>
  <div class="cc-header-label">{{periodLabel}}</div>
  <div class="box-arrow-double" (click)="nextClicked('month')">
    <i class="material-icons cc-double-arrow">keyboard_arrow_right</i>
  </div>
  <div class="box-arrow-double" (click)="nextClicked('year')">
    <i class="material-icons cc-double-arrow">keyboard_arrow_right</i>
    <i class="material-icons cc-double-arrow">keyboard_arrow_right</i>
  </div>
</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CcHeader<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    var res = this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();

    var split = res.split(' ');
    return split[0] + ' ' + (parseInt(split[1]) + 543).toString()
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }
}