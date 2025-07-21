import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCriteriaComponent } from './banner-criteria.component';

describe('BannerCriteriaComponent', () => {
  let component: BannerCriteriaComponent;
  let fixture: ComponentFixture<BannerCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
