import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'box-approve-member',
  templateUrl: './box-approve-member.component.html',
  styleUrls: ['./box-approve-member.component.css']
})
export class BoxApproveMemberComponent implements OnInit {

  @Input() label:String = '';
  @Input() oldData:String = '';
  @Input() newData:String = '';
  @Input() readonly:boolean = false;
  @Output() change = new EventEmitter<boolean>();

  private _selection: any;
  get isSelected(): any {
      return this._selection;
  }
  @Input()
  set isSelected(value: any) {
      if(this._selection === value) {
          return;
      }
      this._selection = value;
      this.isSelectedChange.emit(this._selection);
  }
  @Output()
  isSelectedChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  emit(param) {
    this.change.emit(param);
  }
}