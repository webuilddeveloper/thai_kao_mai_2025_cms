import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPopupListComponent } from './main-popup-list.component';

describe('MainPopupListComponent', () => {
  let component: MainPopupListComponent;
  let fixture: ComponentFixture<MainPopupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPopupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
