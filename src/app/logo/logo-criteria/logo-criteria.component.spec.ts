import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCriteriaComponent } from './logo-criteria.component';

describe('LogoCriteriaComponent', () => {
  let component: LogoCriteriaComponent;
  let fixture: ComponentFixture<LogoCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
