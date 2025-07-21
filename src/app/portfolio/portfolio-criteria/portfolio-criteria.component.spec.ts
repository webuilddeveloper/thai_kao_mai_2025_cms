import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCriteriaComponent } from './portfolio-criteria.component';

describe('PortfolioCriteriaComponent', () => {
  let component: PortfolioCriteriaComponent;
  let fixture: ComponentFixture<PortfolioCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
