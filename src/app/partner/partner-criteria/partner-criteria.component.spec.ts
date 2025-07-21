import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerCriteriaComponent } from './partner-criteria.component';

describe('PartnerCriteriaComponent', () => {
  let component: PartnerCriteriaComponent;
  let fixture: ComponentFixture<PartnerCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
