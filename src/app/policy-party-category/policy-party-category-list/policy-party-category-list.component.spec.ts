import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyPartyCategoryListComponent } from './policy-party-category-list.component';

describe('PolicyPartyCategoryListComponent', () => {
  let component: PolicyPartyCategoryListComponent;
  let fixture: ComponentFixture<PolicyPartyCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyPartyCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyPartyCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
