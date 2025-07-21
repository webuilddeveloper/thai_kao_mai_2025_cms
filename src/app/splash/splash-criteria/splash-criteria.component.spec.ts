import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashCriteriaComponent } from './splash-criteria.component';

describe('SplashCriteriaComponent', () => {
  let component: SplashCriteriaComponent;
  let fixture: ComponentFixture<SplashCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
