import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPopupEditComponent } from './main-popup-edit.component';

describe('MainPopupEditComponent', () => {
  let component: MainPopupEditComponent;
  let fixture: ComponentFixture<MainPopupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPopupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
