import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCategoryCriteriaComponent } from './event-calendar-category-criteria.component';

describe('EventCalendarCategoryCriteriaComponent', () => {
  let component: EventCalendarCategoryCriteriaComponent;
  let fixture: ComponentFixture<EventCalendarCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
