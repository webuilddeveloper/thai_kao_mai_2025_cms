import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCategoryEditComponent } from './donate-category-edit.component';

describe('DonateCategoryEditComponent', () => {
  let component: DonateCategoryEditComponent;
  let fixture: ComponentFixture<DonateCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
