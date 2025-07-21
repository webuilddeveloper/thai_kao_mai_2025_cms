import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashListComponent } from './splash-list.component';

describe('SplashListComponent', () => {
  let component: SplashListComponent;
  let fixture: ComponentFixture<SplashListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
