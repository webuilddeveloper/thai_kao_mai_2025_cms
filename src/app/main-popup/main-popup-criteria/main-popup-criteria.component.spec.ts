import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPopupCriteriaComponent } from './main-popup-criteria.component';

describe('MainPopupCriteriaComponent', () => {
  let component: MainPopupCriteriaComponent;
  let fixture: ComponentFixture<MainPopupCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPopupCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPopupCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
