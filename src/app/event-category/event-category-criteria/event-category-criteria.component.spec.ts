import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCategoryCriteriaComponent } from './event-category-criteria.component';

describe('EventCategoryCriteriaComponent', () => {
  let component: EventCategoryCriteriaComponent;
  let fixture: ComponentFixture<EventCategoryCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCategoryCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCategoryCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
