import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryCriteriaComponent } from './news-category-criteria.component';

describe('NewsCategoryCriteriaComponent', () => {
  let component: NewsCategoryCriteriaComponent;
  let fixture: ComponentFixture<NewsCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
