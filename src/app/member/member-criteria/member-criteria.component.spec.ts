import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCriteriaComponent } from './member-criteria.component';

describe('MemberCriteriaComponent', () => {
  let component: MemberCriteriaComponent;
  let fixture: ComponentFixture<MemberCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
