import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCalendarCategoryEditComponent } from './event-calendar-category-edit.component';

describe('EventCalendarCategoryEditComponent', () => {
  let component: EventCalendarCategoryEditComponent;
  let fixture: ComponentFixture<EventCalendarCategoryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCalendarCategoryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCalendarCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
