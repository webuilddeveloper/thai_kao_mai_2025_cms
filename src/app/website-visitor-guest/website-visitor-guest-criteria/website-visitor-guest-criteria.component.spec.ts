import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteVisitorGuestCriteriaComponent } from './website-visitor-guest-criteria.component';

describe('WebsiteVisitorGuestCriteriaComponent', () => {
  let component: WebsiteVisitorGuestCriteriaComponent;
  let fixture: ComponentFixture<WebsiteVisitorGuestCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteVisitorGuestCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteVisitorGuestCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
