import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceCriteriaComponent } from './alliance-criteria.component';

describe('AllianceCriteriaComponent', () => {
  let component: AllianceCriteriaComponent;
  let fixture: ComponentFixture<AllianceCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
