import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCategoryComponent } from './event-calendar-category.component';

describe('EventCalendarCategoryComponent', () => {
  let component: EventCalendarCategoryComponent;
  let fixture: ComponentFixture<EventCalendarCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
