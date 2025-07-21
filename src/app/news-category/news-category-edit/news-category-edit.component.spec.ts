import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryEditComponent } from './news-category-edit.component';

describe('NewsCategoryEditComponent', () => {
  let component: NewsCategoryEditComponent;
  let fixture: ComponentFixture<NewsCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
