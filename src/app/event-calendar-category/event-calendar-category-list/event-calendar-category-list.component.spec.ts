import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCategoryListComponent } from './event-calendar-category-list.component';

describe('EventCalendarCategoryListComponent', () => {
  let component: EventCalendarCategoryListComponent;
  let fixture: ComponentFixture<EventCalendarCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
