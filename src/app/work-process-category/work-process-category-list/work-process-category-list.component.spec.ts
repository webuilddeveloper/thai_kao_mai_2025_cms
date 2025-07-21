import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProcessCategoryListComponent } from './work-process-category-list.component';

describe('WorkProcessCategoryListComponent', () => {
  let component: WorkProcessCategoryListComponent;
  let fixture: ComponentFixture<WorkProcessCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkProcessCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkProcessCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
