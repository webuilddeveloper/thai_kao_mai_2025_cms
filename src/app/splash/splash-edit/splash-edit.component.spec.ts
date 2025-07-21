import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashEditComponent } from './splash-edit.component';

describe('SplashEditComponent', () => {
  let component: SplashEditComponent;
  let fixture: ComponentFixture<SplashEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
