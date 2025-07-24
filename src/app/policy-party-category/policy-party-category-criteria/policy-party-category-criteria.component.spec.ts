import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyCategoryCriteriaComponent } from './policy-party-category-criteria.component';

describe('PolicyPartyCategoryCriteriaComponent', () => {
  let component: PolicyPartyCategoryCriteriaComponent;
  let fixture: ComponentFixture<PolicyPartyCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
