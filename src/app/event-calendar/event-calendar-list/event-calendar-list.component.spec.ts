import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarListComponent } from './event-calendar-list.component';

describe('EventCalendarListComponent', () => {
  let component: EventCalendarListComponent;
  let fixture: ComponentFixture<EventCalendarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
