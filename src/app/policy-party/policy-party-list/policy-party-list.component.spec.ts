import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyListComponent } from './policy-party-list.component';

describe('PolicyPartyListComponent', () => {
  let component: PolicyPartyListComponent;
  let fixture: ComponentFixture<PolicyPartyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
