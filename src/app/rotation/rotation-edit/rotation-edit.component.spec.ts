import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationEditComponent } from './rotation-edit.component';

describe('RotationEditComponent', () => {
  let component: RotationEditComponent;
  let fixture: ComponentFixture<RotationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
