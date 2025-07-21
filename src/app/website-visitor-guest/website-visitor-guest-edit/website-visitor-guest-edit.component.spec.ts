import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteVisitorGuestEditComponent } from './website-visitor-guest-edit.component';

describe('WebsiteVisitorGuestEditComponent', () => {
  let component: WebsiteVisitorGuestEditComponent;
  let fixture: ComponentFixture<WebsiteVisitorGuestEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteVisitorGuestEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteVisitorGuestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
