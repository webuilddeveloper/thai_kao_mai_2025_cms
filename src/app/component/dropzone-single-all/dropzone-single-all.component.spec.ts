import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneSingleAllComponent } from './dropzone-single-all.component';

describe('DropzoneSingleAllComponent', () => {
  let component: DropzoneSingleAllComponent;
  let fixture: ComponentFixture<DropzoneSingleAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropzoneSingleAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneSingleAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
