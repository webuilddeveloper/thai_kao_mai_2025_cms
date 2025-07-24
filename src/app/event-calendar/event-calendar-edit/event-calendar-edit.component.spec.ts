import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarEditComponent } from './event-calendar-edit.component';

describe('EventCalendarEditComponent', () => {
  let component: EventCalendarEditComponent;
  let fixture: ComponentFixture<EventCalendarEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
