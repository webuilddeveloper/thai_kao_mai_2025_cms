import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCategoryListComponent } from './event-category-list.component';

describe('EventCategoryListComponent', () => {
  let component: EventCategoryListComponent;
  let fixture: ComponentFixture<EventCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
