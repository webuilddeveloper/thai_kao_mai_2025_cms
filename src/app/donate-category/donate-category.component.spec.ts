import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateCategoryComponent } from './donate-category.component';

describe('DonateCategoryComponent', () => {
  let component: DonateCategoryComponent;
  let fixture: ComponentFixture<DonateCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
