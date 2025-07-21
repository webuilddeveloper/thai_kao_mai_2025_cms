import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'csop',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionsComponent implements OnInit {

  @Input() label;
  @Input() data: any;
  @Input() disabled = false;
  @Input() sources: any = [];
  @Output() cModel = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.cModel.emit(this.data || '');
  }

  emit(param) {
    this.cModel.emit(param);
  }

  setValue() {
    this.data = '';
  }

}
