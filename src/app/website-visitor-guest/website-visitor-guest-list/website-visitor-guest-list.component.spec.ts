import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteVisitorGuestListComponent } from './website-visitor-guest-list.component';

describe('WebsiteVisitorGuestListComponent', () => {
  let component: WebsiteVisitorGuestListComponent;
  let fixture: ComponentFixture<WebsiteVisitorGuestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteVisitorGuestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteVisitorGuestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
