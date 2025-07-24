import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyCategoryComponent } from './policy-party-category.component';

describe('PolicyPartyCategoryComponent', () => {
  let component: PolicyPartyCategoryComponent;
  let fixture: ComponentFixture<PolicyPartyCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
