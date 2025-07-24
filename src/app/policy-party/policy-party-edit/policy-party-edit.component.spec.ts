import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyEditComponent } from './policy-party-edit.component';

describe('PolicyPartyEditComponent', () => {
  let component: PolicyPartyEditComponent;
  let fixture: ComponentFixture<PolicyPartyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
