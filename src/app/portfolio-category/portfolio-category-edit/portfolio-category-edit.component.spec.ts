import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCategoryEditComponent } from './portfolio-category-edit.component';

describe('PortfolioCategoryEditComponent', () => {
  let component: PortfolioCategoryEditComponent;
  let fixture: ComponentFixture<PortfolioCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
