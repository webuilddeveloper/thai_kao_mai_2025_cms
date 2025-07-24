import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyCategoryEditComponent } from './policy-party-category-edit.component';

describe('PolicyPartyCategoryEditComponent', () => {
  let component: PolicyPartyCategoryEditComponent;
  let fixture: ComponentFixture<PolicyPartyCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
