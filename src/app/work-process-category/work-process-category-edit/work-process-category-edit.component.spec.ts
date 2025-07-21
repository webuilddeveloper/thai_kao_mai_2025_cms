import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProcessCategoryEditComponent } from './work-process-category-edit.component';

describe('WorkProcessCategoryEditComponent', () => {
  let component: WorkProcessCategoryEditComponent;
  let fixture: ComponentFixture<WorkProcessCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkProcessCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkProcessCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
