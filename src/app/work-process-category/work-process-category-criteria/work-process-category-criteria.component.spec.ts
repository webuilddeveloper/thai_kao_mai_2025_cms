import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProcessCategoryCriteriaComponent } from './work-process-category-criteria.component';

describe('WorkProcessCategoryCriteriaComponent', () => {
  let component: WorkProcessCategoryCriteriaComponent;
  let fixture: ComponentFixture<WorkProcessCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkProcessCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkProcessCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
