import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyComponent } from './policy-party.component';

describe('PolicyPartyComponent', () => {
  let component: PolicyPartyComponent;
  let fixture: ComponentFixture<PolicyPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
