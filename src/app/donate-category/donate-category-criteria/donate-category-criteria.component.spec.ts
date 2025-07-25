import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCategoryCriteriaComponent } from './donate-category-criteria.component';

describe('DonateCategoryCriteriaComponent', () => {
  let component: DonateCategoryCriteriaComponent;
  let fixture: ComponentFixture<DonateCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
