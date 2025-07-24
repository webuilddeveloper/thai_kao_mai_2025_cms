import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCriteriaComponent } from './event-calendar-criteria.component';

describe('EventCalendarCriteriaComponent', () => {
  let component: EventCalendarCriteriaComponent;
  let fixture: ComponentFixture<EventCalendarCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
