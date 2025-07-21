import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotationCriteriaComponent } from './rotation-criteria.component';

describe('RotationCriteriaComponent', () => {
  let component: RotationCriteriaComponent;
  let fixture: ComponentFixture<RotationCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotationCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
