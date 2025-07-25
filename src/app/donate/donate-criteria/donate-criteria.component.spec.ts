import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCriteriaComponent } from './donate-criteria.component';

describe('DonateCriteriaComponent', () => {
  let component: DonateCriteriaComponent;
  let fixture: ComponentFixture<DonateCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
