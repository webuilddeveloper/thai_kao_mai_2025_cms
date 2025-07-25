import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCategoryListComponent } from './donate-category-list.component';

describe('DonateCategoryListComponent', () => {
  let component: DonateCategoryListComponent;
  let fixture: ComponentFixture<DonateCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
