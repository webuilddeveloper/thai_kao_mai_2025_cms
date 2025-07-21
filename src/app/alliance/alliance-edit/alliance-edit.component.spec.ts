import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceEditComponent } from './alliance-edit.component';

describe('AllianceEditComponent', () => {
  let component: AllianceEditComponent;
  let fixture: ComponentFixture<AllianceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
