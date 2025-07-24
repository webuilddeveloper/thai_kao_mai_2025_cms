import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyCriteriaComponent } from './policy-party-criteria.component';

describe('PolicyPartyCriteriaComponent', () => {
  let component: PolicyPartyCriteriaComponent;
  let fixture: ComponentFixture<PolicyPartyCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
