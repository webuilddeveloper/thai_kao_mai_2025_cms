import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProcessCategoryComponent } from './work-process-category.component';

describe('WorkProcessCategoryComponent', () => {
  let component: WorkProcessCategoryComponent;
  let fixture: ComponentFixture<WorkProcessCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkProcessCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkProcessCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
