import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateDetailsComponent } from './donate-details.component';

describe('DonateDetailsComponent', () => {
  let component: DonateDetailsComponent;
  let fixture: ComponentFixture<DonateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
