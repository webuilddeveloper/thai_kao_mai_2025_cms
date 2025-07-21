import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCategoryCriteriaComponent } from './portfolio-category-criteria.component';

describe('PortfolioCategoryCriteriaComponent', () => {
  let component: PortfolioCategoryCriteriaComponent;
  let fixture: ComponentFixture<PortfolioCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
